hardhat.config.ts で etherscan の項目の apiKey に該当サイトでサインインして得た api キーを入れると、デプロイした時に etherscan で誰でもコントラクトを操作できるようになる

# スマートコントラクトデプロイ前の検証手順

1. solidity ファイルを平滑化する(Flatten solidity files)

- Ref: https://medium.com/@tivan7404/learn-how-to-flatten-a-smart-contract-and-verify-on-blocksscan-4daca3be3ac7

2. solc-select でコンパイル ver を決定

- 上の手順 ① で平滑化したファイルをコンパイルできた Remix 上のコンパイル ver を確認して`solc-select use [VERSION] --alway-install`で ver 決定

3. slither でコードの微弱性を検証

- CMD で`slither [検証したいコントラクトのパス]`することで検証可能

############

ABI の型を種強くすることが可能

- typechain --target=ethers-v5 frontend/vue-project/src/abi/gameitems.json
