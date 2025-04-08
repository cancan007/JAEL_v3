import { ethers } from "hardhat";
import fs from "fs";
import fse from "fs-extra";
import dotenv from "dotenv";
dotenv.config();

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

async function main() {
  const TimeLock = await ethers.getContractFactory("TimeLock_PRO");
  const [owner] = await ethers.getSigners();
  const minDelay = 1;
  const proposers = [owner.address];
  const executors = [owner.address];
  const tlc = await TimeLock.deploy(
    minDelay,
    proposers,
    executors,
    owner.address
  );
  await tlc.deployed();

  //map.jsonは、ブロックチェーンネットワークごとにデプロイしたコントラクトアドレスを保存している
  let mapJson: any = fs.existsSync("./map.json")
    ? fs.readFileSync("./map.json")
    : {};
  if (!fs.existsSync("./map.json")) {
    mapJson = JSON.stringify(mapJson);
  }
  mapJson = JSON.parse(mapJson);
  const { chainId } = await ethers.provider.getNetwork();
  const chainKey = chainId.toString();
  const tokenAddress = mapJson[chainKey]["JT"].slice(-1)[0];
  const Gov = await ethers.getContractFactory("GovernorContract_PRO");
  const gov = await Gov.deploy(
    tokenAddress,
    tlc.address,
    chainId == 10 ? 7200 : 150, // votingDelayは本番で7200(約1日)に設定
    chainId == 10 ? 50400 : 1050, // votingPeriodは本番で50400(約1週間)に設定
    10 // 提案することができる閾値を設定
    /*{
      gasLimit,
    }*/
  );
  await gov.deployed();
  const proposerRole = await tlc.PROPOSER_ROLE();
  const executorRole = await tlc.EXECUTOR_ROLE();
  const adminRole = await tlc.DEFAULT_ADMIN_ROLE();
  await tlc.grantRole(proposerRole, gov.address);
  await tlc.grantRole(executorRole, ADDRESS_ZERO);
  await tlc.revokeRole(adminRole, owner.address);

  if (!mapJson[chainKey]) {
    mapJson = {
      [chainKey]: { TLC: [] },
      ...mapJson,
    };
  } else if (!mapJson[chainKey]["TLC"]) {
    mapJson[chainKey]["TLC"] = [];
  }
  mapJson[chainKey]["TLC"].push(tlc.address);

  if (!mapJson[chainKey]) {
    mapJson = {
      [chainKey]: { GC: [] },
      ...mapJson,
    };
  } else if (!mapJson[chainKey]["GC"]) {
    mapJson[chainKey]["GC"] = [];
  }
  mapJson[chainKey]["GC"].push(gov.address);
  let mapJsonSt = JSON.stringify(mapJson);

  //map.jsonをadmin-v2に複製
  fs.writeFileSync("./map.json", mapJsonSt);
  fs.writeFileSync("../../frontend/src/utils/web3/DAO/map.json", mapJsonSt);
  console.log("Updated map.json");

  //artifactsはコントラクトの中身のようなもの(コンパイルする際に作成される)で、server-v2からブロックチェーン上のコントラクトを操作するために必要なためserver-v2に複製
  if (fs.existsSync("../../frontend/src/utils/web3/DAO/artifacts")) {
    await fse
      .remove("../../frontend/src/utils/web3/DAO/artifacts")
      .then(() =>
        console.log("deleted ../../frontend/src/utils/web3/DAO/artifacts")
      )
      .catch((err) => console.error(err));
    fse.copySync("./artifacts", "../../frontend/src/utils/web3/DAO/artifacts");
    console.log("Updated ../../frontend/src/utils/web3/DAO/artifacts");
    return;
  }

  fse.copySync("./artifacts", "../../frontend/src/utils/web3/DAO/artifacts");
  console.log("Created ../../frontend/src/utils/web3/DAO/artifacts");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
