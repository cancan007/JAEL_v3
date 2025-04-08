const fse = require("fs-extra");
const fs = require("fs");

if (fs.existsSync("./.next")) {
  fse.copySync("./.next", "../backend/src/client/.next");
  console.log("Copied next file to backend");
}
