/* ============================================================
   rebuild-data.js · 由 data/*.json 重新生成 data/*.js
   用法：node scripts/rebuild-data.js
   （data/*.js 为运行加载版本，请勿手改）
   ============================================================ */
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

const targets = [
  ["plugins.json", "plugins.js", "PLUGINS_DATA"],
  ["hosts.json", "hosts.js", "HOSTS_DATA"],
  ["troubleshooting.json", "troubleshooting.js", "TROUBLESHOOT_DATA"],
  ["changelog.json", "changelog.js", "CHANGELOG_DATA"],
];

for (const [src, dst, varName] of targets) {
  const srcPath = path.join(DATA_DIR, src);
  const dstPath = path.join(DATA_DIR, dst);
  try {
    const obj = JSON.parse(fs.readFileSync(srcPath, "utf8"));
    fs.writeFileSync(dstPath, "window." + varName + " = " + JSON.stringify(obj, null, 2) + ";\n");
    console.log("OK  " + dst + "  ←  " + src);
  } catch (e) {
    console.error("FAIL " + src + " : " + e.message);
    process.exitCode = 1;
  }
}
