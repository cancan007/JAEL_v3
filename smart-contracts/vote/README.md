# Sample Hardhat Project

### DAO 等のメモ

##### propose する際の引数の意味

- targets は施行される際のコントラクトアドレスか wallet address たち
- values は target たちの関数を呼ぶ際に渡す value(payable)
- calldatas は targets のコントラクトの関数を引数とともに指定して呼ぶ
- description はその名の通り説明
  ➡️ 今回の実装では,
  関数とかではなく、一般的な選択肢の投票をしたい場合、targets に一つ適当にアドレス入れて、value を 0 にして、calldata も適当な 0x とかにして、description で ① 投票内容を書けばいいかと思う
  ➡️ 関数を呼ばないで投票をしてもらうため

##### GovernanceContract における重要事項

- propose であげた提案を execute する際のスマートコントラクト内での呼び出し者は TimeLock
  ➡️ つまり、transfer などでトークンを execute 時に贈りたいときは、TimeLock コントラクトにトークンを与える必要あり

##### 以下参考文献

参考: https://docs.openzeppelin.com/contracts/5.x/governance
参考 ②: https://qiita.com/lowzzy/items/5753c424399be5c41c30
参考 ③: https://docs.openzeppelin.com/contracts/5.x/api/governance
全体像参考: https://moralis.io/how-to-create-a-dao-in-10-minutes/
calldata とは: https://qiita.com/oatnnimi/items/c303667043c90a5252c6

日本語で NFT マーケットプレイスのガバナンスを DAO にしているコミュニティの参考: https://recruit.gmo.jp/engineer/jisedai/blog/dao/

コントラクト内の msg.sender の中身の要注意事項: https://zenn.dev/blueplanet/articles/2023-05-06-msg-sender
