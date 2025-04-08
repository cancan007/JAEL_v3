import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

let description = "description";
const gasLimit = 30000000;

describe("DAO", function () {
  async function deployGovFixture(forTest: boolean) {
    const [owner, otherAccount, otherAccount2, otherAccount3] =
      await ethers.getSigners();

    // ############################
    // ########## deploy ##########
    // ############################
    const Gov = await ethers.getContractFactory("GovernorContract");
    const Token = await ethers.getContractFactory("GovernanceToken");
    const TLC = await ethers.getContractFactory("TimeLock");
    const token = await Token.deploy(
      "GovToken",
      "GT",
      ethers.utils.parseEther("10000.0"),
      { gasLimit }
    );
    const minDelay = 1;
    const proposers = [otherAccount.address];
    const executors = [otherAccount.address];
    const tlc = await TLC.deploy(
      minDelay,
      proposers,
      executors,
      owner.address,
      { gasLimit }
    );
    const TokenAddress = token.address;
    const TlcAddress = tlc.address;
    console.log(TokenAddress, TlcAddress, owner.address, otherAccount.address);

    // for test, give votingDelay_ 0
    const gov = await Gov.deploy(
      TokenAddress,
      TlcAddress,
      forTest ? 0 : 7200,
      forTest ? 6 : 50400,
      1,
      {
        gasLimit,
      }
    );

    await token.deployed();
    await gov.deployed();
    await tlc.deployed();

    // #############################
    // ########## role ############
    // ############################
    const proposerRole = await tlc.PROPOSER_ROLE();
    const executorRole = await tlc.EXECUTOR_ROLE();
    const adminRole = await tlc.DEFAULT_ADMIN_ROLE();

    console.log("roles", proposerRole, executorRole, adminRole);
    await tlc.grantRole(proposerRole, gov.address);
    await tlc.grantRole(executorRole, ADDRESS_ZERO);
    await tlc.revokeRole(adminRole, owner.address);

    const t = await gov.exec();
    console.log("test", t);
    console.log("gov add:", gov.address);

    // ################################
    // ########### send eth ###########
    // ################################
    await owner.sendTransaction({
      to: tlc.address,
      value: ethers.utils.parseEther("11.0"),
      gasLimit,
    });
    let tx = await token.transfer(
      otherAccount2.address,
      ethers.utils.parseEther("11.0")
    );
    await tx.wait();
    await token.transfer(tlc.address, ethers.utils.parseEther("22.0")); //proposeの施行時(execute)に、TimeLockコントラクトによりcalldataが呼ばれるため(msg.senderがTimeLock)
    /*await owner.sendTransaction({
          to: gov.address,
          value: ethers.utils.parseEther("10.0"),
          gasLimit,
        });*/

    // ################################
    // ########## delegate ############
    // ################################
    const ret = await token.delegate(owner.address); // delegateをホルダー自身か投票及び提案を行なってほしい他者に行うことでガバナンスに参加できる(ホルダーでさえ最初に自分自身にdelegateしないと参画できないっぽい)
    await token.connect(otherAccount2).delegate(otherAccount.address); //全体の11トークン分のweightのホルダーの代理ガバナンス参画者として、投票を行える
    //await token.delegate(otherAccount2.address);

    return {
      token,
      gov,
      owner,
      otherAccount,
      tlc,
      otherAccount2,
      otherAccount3,
    };
  }

  async function deployGovFixtureForFix() {
    return await deployGovFixture(true);
  }

  describe("Voting", function () {
    it("basic process", async function () {
      const {
        token,
        gov,
        owner,
        otherAccount,
        tlc,
        otherAccount2,
        otherAccount3,
      } = await loadFixture(deployGovFixtureForFix);

      const abi = ["function transfer(address to, uint256 value)"];
      const iface = new ethers.utils.Interface(abi);
      const calldata = iface.encodeFunctionData("transfer", [
        otherAccount2.address,
        ethers.utils.parseEther("12.0"),
      ]);

      /*const propose_ret = await gov.propose(
        [owner.address],
        [100],
        ["0x"],
        description
      );*/
      const propose_ret = await gov.propose(
        [token.address],
        [0],
        [calldata],
        description
      );
      await expect(
        gov
          .connect(otherAccount3)
          .propose([owner.address], [110], ["0x"], description)
      ).to.be.reverted; // proposalThresholdが1なので、ガバナンストークンを持っていないアカウントは提案できない
      await expect(
        gov
          .connect(otherAccount2)
          .propose([owner.address], [110], ["0x"], description)
      ).to.be.reverted; // otherAccountにすでにガバナンス参画権利を譲渡(delegate)してるので、エラーになる

      await gov
        .connect(otherAccount)
        .propose([owner.address], [110], ["0x"], description); // otherAccount2からガバナンス参画権利を譲渡されているので、直接ガバナンストークンを持っていなくても参画できる

      let tx: any = await propose_ret.wait();
      console.log(tx.events);
      console.log(tx.events[0].args.proposalId);
      let proposalId = tx.events[0].args.proposalId;

      const support = 1; // 賛成
      // const support = 0; // 反対
      // const support = 2; // 棄権

      tx = await gov.castVote(proposalId, support);
      tx = await tx.wait();
      console.log(tx.events);
      await expect(gov.castVote(proposalId, support)).to.be.reverted; // すでに投票ずみ
      console.log("otheraccount2:", otherAccount2.address);
      // tx = await gov.connect(otherAccount2).castVote(proposalId, support);  // 成功はするがotherAccountにdelegate済みなので反映はされない
      tx = await gov.connect(otherAccount).castVote(proposalId, 2);
      tx = await tx.wait();
      console.log(tx.events);
      /*await expect(gov.connect(otherAccount).castVote(proposalId, 0)).to.be
        .reverted;*/
      let ob = await token.balanceOf(otherAccount.address);
      let ob2 = await token.balanceOf(otherAccount2.address);
      console.log("balances: ", ob, ob2); // delegateしても自分が保有しているトークン数は変わらない

      const latestBlockNum = await ethers.provider.getBlockNumber();
      console.log(latestBlockNum);
      tx = await gov.getVotes(owner.address, latestBlockNum - 1); // proposalStartTimeより後に受け取った分のトークンの分は、該当の投票では反映されない
      console.log("how many votes:", tx);
      tx = await gov.proposalSnapshot(proposalId);
      console.log("start time(block) of this propose:", tx);
      tx = await gov.proposalDeadline(proposalId);
      console.log("deadline time(block) of this propose:", tx);
      tx = await gov.proposalVotes(proposalId); // against:反対, for: 賛成, abstain: 棄権 の投票数を取得
      console.log(tx);
      tx = await gov.hasVoted(proposalId, owner.address);
      console.log("is voted:", tx);
      tx = await gov.state(proposalId); // 0: Pending, 1: Active, 2: Canceled, 3: Defeated, 4: Succeeded, 5: Queued, 6: Expired, 7: Executed
      console.log("state:", tx);

      const desHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(description)
      );

      /*await expect(gov.execute([owner.address], [100], ["0x"], desHash)).to.be
        .reverted;*/ // 施行する前にキューに追加する必要あり
      tx = await gov.queue([token.address], [0], [calldata], desHash); //otherAccount2でもできたので、queueは誰でもできるっぽい
      tx = await tx.wait();
      console.log(tx);
      //tx = await gov.execute([owner.address], [100], ["0x"], desHash);
      tx = await gov.execute([token.address], [0], [calldata], desHash); //otherAccount2でもできたので、executeは誰でもできるっぽい
      tx = await tx.wait();
      console.log(tx);
      let totalBalance = await token.balanceOf(otherAccount2.address);
      console.log("ot2 balance:", totalBalance); // executeしたことにより、proposalの23eth分のガバナンストークンがGovernanceContract内の関数をTimeLock呼び出しにより送られた
      expect(totalBalance).to.equal(ethers.utils.parseEther("23.0"));
    });

    it("against case", async function () {
      const {
        token,
        gov,
        owner,
        otherAccount,
        tlc,
        otherAccount2,
        otherAccount3,
      } = await loadFixture(deployGovFixtureForFix);

      const abi = ["function transfer(address to, uint256 value)"];
      const iface = new ethers.utils.Interface(abi);
      const calldata = iface.encodeFunctionData("transfer", [
        otherAccount2.address,
        ethers.utils.parseEther("12.0"),
      ]);

      const propose_ret = await gov.propose(
        [token.address],
        [0],
        [calldata],
        description
      );
      await expect(
        gov
          .connect(otherAccount3)
          .propose([owner.address], [110], ["0x"], description)
      ).to.be.reverted; // proposalThresholdが1なので、ガバナンストークンを持っていないアカウントは提案できない
      await expect(
        gov
          .connect(otherAccount2)
          .propose([owner.address], [110], ["0x"], description)
      ).to.be.reverted; // otherAccountにすでにガバナンス参画権利を譲渡(delegate)してるので、エラーになる

      await gov
        .connect(otherAccount)
        .propose([owner.address], [110], ["0x"], description); // otherAccount2からガバナンス参画権利を譲渡されているので、直接ガバナンストークンを持っていなくても参画できる

      let tx: any = await propose_ret.wait();
      console.log("proposal:", tx.events[0].args);
      let proposalId = tx.events[0].args.proposalId;

      //const support = 1; // 賛成
      const support = 0; // 反対

      tx = await gov.castVote(proposalId.toString(), support);
      tx = await tx.wait();
      await expect(gov.castVote(proposalId, support)).to.be.reverted; // すでに投票ずみ
      console.log("otheraccount2:", otherAccount2.address);
      tx = await gov.connect(otherAccount).castVote(proposalId, 2);
      tx = await tx.wait();
      /*await expect(gov.connect(otherAccount).castVote(proposalId, 0)).to.be
          .reverted;*/

      const latestBlockNum = await ethers.provider.getBlockNumber();
      console.log(latestBlockNum);
      tx = await gov.getVotes(owner.address, latestBlockNum - 1);
      console.log("how many votes:", tx);
      tx = await gov.proposalSnapshot(proposalId);
      console.log("start time(block) of this propose:", tx);
      tx = await gov.proposalDeadline(proposalId);
      console.log("deadline time(block) of this propose:", tx);
      tx = await gov.proposalVotes(proposalId); // against:反対, for: 賛成, abstain: 棄権 の投票数を取得
      console.log(tx);
      tx = await gov.hasVoted(proposalId, owner.address);
      console.log("is voted:", tx);
      tx = await gov.state(proposalId); // 0: Pending, 1: Active, 2: Canceled, 3: Defeated, 4: Succeeded, 5: Queued, 6: Expired, 7: Executed
      console.log("state:", tx);

      const desHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(description)
      );
      /*await expect(gov.execute([owner.address], [100], ["0x"], desHash)).to.be
          .reverted;*/ // 施行する前にキューに追加する必要あり
      await expect(gov.queue([token.address], [0], [calldata], desHash)).to.be
        .reverted; // GovernorUnexpectedProposalState(59062924215697248605472868617521442300760391619394346488671042725252590864842, 3, "0x0000000000000000000000000000000000000000000000000000000000000010")' というエラー。二つの目の数字3はproposalの状態変数でDefeated(棄却)を表しているため、voteが終了した時点でAgainstの方が多かったため、queueできずにそのままエラーになったと考えられる
    });
  });
});
