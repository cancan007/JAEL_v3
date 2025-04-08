import { ethers } from "hardhat";
import fs from "fs";
import fse from "fs-extra";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const GT = await ethers.getContractFactory("GovernanceToken_PRO");
  const [owner] = await ethers.getSigners();
  const gt = await GT.deploy(
    "JAEL-Token",
    "JT",
    ethers.utils.parseEther("10000000.0")
    // ガス代してしなくてもガス料金はかなり低いので大丈夫そう
    /*{
      gasLimit: 500000, // ガス代は右のように決まる value + gasPrice * gasLimit
      gasPrice: 100000000,
    }*/
  );
  await gt.deployed();
  await gt.delegate(owner.address);
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
  if (!mapJson[chainKey]) {
    mapJson = {
      [chainKey]: { JT: [] },
      ...mapJson,
    };
  } else if (!mapJson[chainKey]["JT"]) {
    mapJson[chainKey]["JT"] = [];
  }
  mapJson[chainKey]["JT"].push(gt.address);
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
