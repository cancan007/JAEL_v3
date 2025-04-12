generate-types-artifacts:
	- @echo "=== スマートコンタクトのtypescript用の型生成 ==="
	- @echo "=== 注意；artifactsの中にbuild-infoフォルダがあればそれを削除する必要あり ==="
	- npx typechain --target ethers-v6 --out-dir ./src/utils/web3/DAO/typechain/GovernanceToken ./src/utils/web3/DAO/artifacts/contracts/dao/GovernanceToken.sol/GovernanceToken.json --show-stack-traces
	- npx typechain --target ethers-v6 --out-dir ./src/utils/web3/DAO/typechain/GovernorContract ./src/utils/web3/DAO/artifacts/contracts/dao/GovernorContract.sol/GovernorContract.json --show-stack-traces