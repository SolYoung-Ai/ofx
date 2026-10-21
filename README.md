# OFX Atlas · OFX 插件兼容性数据库

> 收录官网可核验的 OFX 视频插件，标注宿主兼容性证据等级与实测状态，提供对比、排错与快捷复制工具。
> **本站不托管、不分发任何插件安装包**，所有下载均跳转官方页面。

- 站点定位：OFX 插件信息聚合 + 兼容性参考 + 工具站
- 差异化：剪映专业版 OFX 兼容性的「官方资料未确认」如实标注 + 达芬奇等宿主兼容矩阵
- 形态：纯静态网站（无构建、无后端、无数据库），可直接双击打开，也可部署到 GitHub Pages / 任意静态托管

---

## 技术栈

| 项 | 选型 | 理由 |
|---|---|---|
| 前端 | 原生 HTML + CSS + JavaScript（ES2020） | 零依赖、零构建，file:// 与任意静态托管均可直接运行 |
| 路由 | Hash 路由（`#/plugin/slug`） | GitHub Pages / 子路径 / file:// 深层刷新均不 404 |
| 数据 | `data/*.json`（源）→ `data/*.js`（运行加载） | JSON 便于维护与二次处理；JS 包一层以兼容 file:// 协议 |
| 本地状态 | localStorage | 主题、对比列表、反馈草稿均只存本机，不做跨设备同步 |

## 目录结构

```
.
├── index.html                 # 单页应用外壳（所有页面容器）
├── css/
│   └── styles.css             # 设计变量 / 深色浅色主题 / 全部组件样式
├── data/
│   ├── plugins.json           # 插件数据库（14 款，源数据，编辑此文件）
│   ├── hosts.json             # 宿主（OFX 能力核验结论）
│   ├── troubleshooting.json   # 故障排查向导数据（分支结构）
│   ├── changelog.json         # 更新日志
│   ├── *.js                   # 由 node 生成的运行加载版本（勿手改）
└── js/
    ├── store.js               # localStorage 状态管理
    ├── utils.js               # 转义 / 复制 / toast / 状态徽章等
    ├── router.js              # Hash 路由
    ├── views/                 # 各页面渲染模块
    │   ├── home.js            # 首页：统计 / 筛选 / 搜索 / 排序 / 卡片
    │   ├── plugin.js          # 插件详情
    │   ├── compare.js         # 对比工具（2–4 款）
    │   ├── troubleshoot.js    # 故障排查向导
    │   ├── tools.js           # 快捷复制面板
    │   ├── feedback.js        # 反馈表单（静态替代流程）
    │   ├── changelog.js       # 更新日志
    │   └── about.js           # 关于 / 版权
    └── app.js                 # 启动入口
```

## 本地运行

方式一（最简单）：直接双击 `index.html`，浏览器打开即用（数据以 JS 方式加载，file:// 下正常）。

方式二（推荐，模拟线上环境）：

```bash
cd 项目目录
python3 -m http.server 8080
# 打开 http://localhost:8080
```

## 部署到 GitHub Pages

1. 新建仓库（如 `ofx-atlas`），把本目录所有文件推送到 `main` 分支；
2. 仓库 Settings → Pages → Source 选择 `Deploy from a branch`，分支 `main`、目录 `/ (root)`；
3. 保存后等待 1–2 分钟，访问 `https://<用户名>.github.io/ofx-atlas/`。

说明：本项目使用相对路径 + Hash 路由，**天然兼容仓库根路径与子路径**，无需修改任何配置即可部署到 `https://<用户名>.github.io/<仓库名>/`。

## 部署到子路径（如 solyoung.top/ofx/）

直接把 `index.html`、`css/`、`js/`、`data/` 放到站点子目录即可，无需改动代码（相对路径加载 + Hash 路由）。

## 如何添加新插件

1. 编辑 `data/plugins.json`，在 `plugins` 数组末尾追加对象，字段说明：

```json
{
  "id": "唯一标识",
  "slug": "URL slug（与 id 一致即可）",
  "name": "插件名称",
  "developer": "开发者 / 厂商",
  "tagline": "一句话简介",
  "category": ["分类标识，见下方分类表"],
  "tags": ["标签1", "标签2"],
  "description": "详细介绍",
  "license": "free | free-donation | one-time | subscription | subscription-or-one-time",
  "price": "价格描述（以官网为准的写『以官网为准』）",
  "platforms": ["windows", "macos", "linux"],
  "officialHome": "官网首页 URL",
  "officialDownload": "官方下载页 URL（必须可核验）",
  "downloadVerified": true,
  "sources": ["核验来源 URL 1", "URL 2"],
  "lastVerified": "YYYY-MM-DD",
  "installationGuide": "安装说明",
  "knownIssues": ["已知问题 1", "问题 2"],
  "compatibility": [
    {
      "host": "davinci-resolve",
      "officialSupport": "supported | unconfirmed | not-supported",
      "studioOnly": true,
      "evidenceLevel": "official-docs | vendor-statement | community-report | self-tested | no-official-info",
      "notes": "说明文字"
    }
  ]
}
```

2. 分类标识参考：`film-emulation` 胶片模拟、`color-grading` 调色、`noise-reduction` 降噪、`repair` 修复增强、`effects` 特效、`stylize` 风格化、`diffusion` 柔光扩散、`scopes` 示波监看、`monitoring` 监看、`retime` 变速、`free` 免费。

3. 重新生成运行数据：

```bash
cd 项目目录
node -e "
const fs = require('fs');
const conv = (src, dst, varName) => {
  fs.writeFileSync(dst, 'window.' + varName + ' = ' + JSON.stringify(JSON.parse(fs.readFileSync(src,'utf8')), null, 2) + ';');
};
conv('data/plugins.json', 'data/plugins.js', 'PLUGINS_DATA');
conv('data/hosts.json', 'data/hosts.js', 'HOSTS_DATA');
conv('data/troubleshooting.json', 'data/troubleshooting.js', 'TROUBLESHOOT_DATA');
conv('data/changelog.json', 'data/changelog.js', 'CHANGELOG_DATA');
console.log('done');
"
```

> 或直接运行仓库内的 `scripts/rebuild-data.js`（如已添加）。注意：**不要手改 `data/*.js`**，它们是生成的。

## 如何修改 / 新增兼容性测试记录

编辑对应插件的 `compatibility` 数组。关键规则：

- `evidenceLevel` 必须与事实匹配：官方文档 / 厂商声明 / 社区反馈 / 本站实测 / 官方资料未确认；
- 没有证据 ≠ 兼容。剪映专业版在官方确认前，一律使用
  `"officialSupport": "unconfirmed", "evidenceLevel": "no-official-info"`；
- 达芬奇第三方 OFX 需 Studio 版，`"studioOnly": true`。

修改后重新生成 `data/*.js`，并在 `data/changelog.json` 增加一条记录。

## 如何更新官方链接与数据核验时间

1. 在 `plugins.json` 中修改 `officialHome` / `officialDownload` / `sources` / `lastVerified`；
2. 若链接已失效且找不到官方替代来源，将 `downloadVerified` 置为 `false`（页面会自动显示「官方来源待核验」并禁用跳转），不要随意填一个非官方地址；
3. 重新生成 `data/*.js`，更新 `changelog.json`。

## 可选：启用第三方反馈服务

当前反馈表单为纯静态替代流程（校验 + 草稿 + 复制 + mailto），不会假装「已发送」。如需接入第三方表单服务（如 Formspree 等）：

1. 在 `js/views/feedback.js` 中新增一个 `FEEDBACK_ENDPOINT` 配置项；
2. 在提交逻辑中：若端点已配置 → `fetch` 提交并显示「已提交」；未配置 → 沿用现有静态流程；
3. 不要把私密密钥写进前端代码，建议使用公开的端点 ID。

## 常见部署错误排查

| 现象 | 原因 / 解决 |
|---|---|
| 双击 index.html 页面空白 | 确认 `data/*.js` 存在（由 JSON 生成）；不要删掉生成的 .js |
| GitHub Pages 404 | 确认文件在根目录或子目录对应位置；Hash 路由不会 404 |
| 修改 JSON 后页面无变化 | 忘记重新生成 `data/*.js` |
| 插件卡片显示「官方来源待核验」 | 该插件 `downloadVerified` 为 false，需补充官方来源后改回 true |

---

**数据核验日期：2026-10-21**。软件与插件版本会持续变化，记录可能过时，使用前请以插件官网与宿主官方文档为准。
