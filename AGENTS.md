# EDC 数字博物馆

Web3D 云把玩平台（EDC 解压玩具数字博物馆）。Web3D 前端为纯静态站点，无构建步骤。

## 常用命令

- 本地预览：`cd /Users/reed_soul/code/edc-library && python3 -m http.server 8765` → `http://localhost:8765`（注意是 **http**，本地无 https）
- 部署上线：`git push origin main`（GitHub Pages 自动部署，约 1 分钟生效）→ `https://reed-soul.github.io/edc-museum/`
- 语法检查：`node --check <file.js>`
- 浏览器回归：无头 Chrome + CDP（见「验证」节）

## 架构

- `museum/`：SPA 静态站（`index.html` + `style.css` + `data.js`）。hash 路由：`#/home`、`#/catalog`、`#/catalog?cat=品类`、`#/item/:id`、`#/play/:id`、`#/about`
- `yunshan-3d-demo/`：Three.js 把玩 Demo。模型几何 / 把玩手感 / 音效 / 相机参数全部在 `models/yunshan.js` 的 `yunshanConfig`（配置驱动：改参数不碰 index.html）
- 数据流：飞书选款表格 → 导出 `museum/data.js`（`window.EDC_ITEMS`，19 款全字段，字段口径与表格一致）→ museum 渲染
- 云把玩注册表：`museum/index.html` 的 `PLAYABLE = { <itemId>: '<相对路径>' }`；未注册的条目没有 `#/play` 视图
- 根 `index.html`：跳转页（→ `./museum/`），仅服务于 GitHub Pages 根路径

## 硬约束（改代码前必读）

- **路径必须相对**（`./`、`../`）：站点部署在 GitHub Pages 子路径 `/edc-museum/` 下，任何绝对路径（`/xxx`）上线即挂。云把玩 iframe 从 museum 指向 demo 用 `../yunshan-3d-demo/index.html`
- **XSS 防护**：所有动态数据拼进 innerHTML 前必须过 `esc()`（museum/index.html 第 97 行已有工具函数）；图标/数字等可信常量除外
- **品类禁止硬编码**：由 `ITEMS` 动态推导（CATS）。踩过的坑：硬编码列表漏掉"桌面轮盘"品类，用户当场抓包
- **新增展品**：飞书表格加行 → 重导出 `data.js`（勿手抄，保持与表格口径一致）；**新增可把玩款**：建 3D Demo → 在 `PLAYABLE` 注册 → 条目 `modelStatus` 标"完成"
- **样式**：深色金属风，CSS 变量在 `style.css` 的 `:root`，配色一律用变量
- **图片来源版权策略未定**（实拍图来自电商/抖音商品页）：正式 3D 化前不要拿测评截图当素材
- **F1 图生 3D**：选型结论已定（腾讯混元主线 / Seed3D 备选 / Tripo 兜底），API 未开通；不得假装已接入 AI 图生 3D
- 飞书表格：`https://my.feishu.cn/sheets/OWbRsg0HMhOqbyttr4RcKFPmnHd`（选款清单，含信号源/评分模型子表）；规划文档：`https://my.feishu.cn/docx/X77WdiuOqoxeQHxkJP5czoQxnzh`

## 验证

- 浏览器回归：无头 Chrome 启动参数 `--headless=new --remote-debugging-port=9223 --remote-allow-origins=* --enable-unsafe-swiftshader --use-angle=swiftshader --user-data-dir=/tmp/edc-chrome-verify`；page WS URL 每次从 `curl http://127.0.0.1:9223/json` 现取（重启后 id 会变）；连接超时先 `pkill -9 -f edc-chrome-verify` 再重启
- 改 museum 后至少验证：数据加载数（19）、首页/展品库渲染、品类过滤、条目详情（雷达图）、iframe 指向、无运行时异常
- 上线后同样用 CDP 验证线上 URL；**注意浏览器缓存**——用 `Page.reload` + `ignoreCache:true` 再断言
