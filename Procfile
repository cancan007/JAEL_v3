web: npm run start-without-next
// this enable to start without using ts-node
// this will run prestart:prod automatically
// githubの容量を抑えるために、distを消す(repositoryに出すとき)
// herokuはpush時にforceを使う

//herokuにpushする際は①frontendでbuild②backendでbuildしてgitignoreからdistを削除③初デプロイ時はherokuのsettingにbackendの環境変数を設定する④コミットしてgit push heroku develop_ver2:main(JAEL v2では git push heroku main)⑤普通のgithubの方でも管理できるように**git reset --soft(あくまでビルドしただけの変更のみのコミットならhard) HEAD^**を行う
//herokuをあげるときに以下の1GB超えているのでというエラーが出る時があるが、気にしなくていい