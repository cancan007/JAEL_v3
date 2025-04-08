import { ethers } from "hardhat";
import tokenAbi from "../artifacts/contracts/GovernanceToken_PRO.sol/GovernanceToken_PRO.json";
import mj from "../map.json";

async function main() {
  const [owner] = await ethers.getSigners();
  const { chainId } = await ethers.provider.getNetwork();
  const chainKey = chainId.toString();
  let mapJson: any = JSON.stringify(mj);
  mapJson = JSON.parse(mapJson);
  const token = await ethers.getContractAt(
    tokenAbi.abi,
    mapJson[chainKey]["JT"].slice(-1)[0]
  );
  await token.delegate(owner.address);
  console.log("Successfully delegate");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
