# FEAT-040：Web Store 上线资料包 + 瓶子图标接入

## 1. 元信息
- 功能 ID：FEAT-040
- 功能名称：Web Store 上线资料包 + 瓶子图标接入
- 日期：2026-03-04
- 作者：Codex
- 分支：N/A

## 2. 概述
为“立即上线插件”目标补齐可直接提交审核的基础资料：
- 下载瓶子图片并生成扩展图标（16/32/48/128）。
- 在 `manifest` 中接入图标与 action 图标。
- 构建流程自动拷贝 `src/icons` 到 `dist/icons`。
- 新增 Web Store 素材自动生成脚本与上架资料文档。
- 新增可公开访问的隐私政策页面 `site/privacy.html`。

## 3. 需求映射
- 对应 PRD 章节：
  - FR-07 设置与发布相关支持
  - 非功能需求：可维护性（流程可复用）
- 覆盖的用户场景：
  - 用户希望尽快上线，减少手工整理商店物料成本。
  - 用户希望图标直接可用，且上线资料集中可查。
- 范围说明（In scope / Out of scope）：
  - In scope：
    - 图标生成与 manifest 接入
    - Web Store 素材生成脚本
    - 上线文案/清单/隐私页
  - Out of scope：
    - 自动提交到 Chrome Web Store（需账号权限，无法在本地自动化完成）

## 4. 设计
- 关键设计决策：
  - 图标基于瓶子图片源自动缩放，保证后续可重复生成。
  - 上线资料按 `docs/store` 统一归档，降低协作成本。
  - 隐私政策单独页面，便于直接填入商店 Privacy URL。
- 取舍说明：
  - 商店截图生成“占位模板”而非真实截图，真实截图仍建议人工替换以提升审核通过率。

## 5. 实现
- 主要变更文件：
  - `src/icons/source-bottle.png`
  - `src/icons/icon-16.png`
  - `src/icons/icon-32.png`
  - `src/icons/icon-48.png`
  - `src/icons/icon-128.png`
  - `src/manifest.json`
  - `scripts/build.mjs`
  - `scripts/prepare-icons.ps1`
  - `scripts/generate-webstore-assets.ps1`
  - `package.json`
  - `assets/webstore/small-promo-440x280.png`
  - `assets/webstore/marquee-1400x560.png`
  - `assets/webstore/screenshot-01-1280x800.png`
  - `site/privacy.html`
  - `site/index.html`
  - `site/styles.css`
  - `docs/store/README.md`
  - `docs/store/PUBLISH_CHECKLIST_ZH-CN.md`
  - `docs/store/WEBSTORE_LISTING_COPY_ZH-CN.md`
  - `docs/store/ASSET_GUIDE_ZH-CN.md`
  - `docs/store/ICON_ATTRIBUTION.md`
  - `docs/GITHUB_PAGES.md`
  - `README.md`
- 核心逻辑：
  - `prepare-icons.ps1`：
    - 下载瓶子图源
    - 输出 16/32/48/128 四个尺寸 PNG
  - `generate-webstore-assets.ps1`：
    - 生成 small promo、marquee 与截图占位图
  - `build.mjs`：
    - 打包时复制 `src/icons` 到 `dist/icons`
  - `manifest.json`：
    - 声明 `icons` 与 `action.default_icon`

## 6. 验证
- 自动化测试：
  - `npm run typecheck`：通过
  - `npm run build`：通过
  - `npm run package:zip`：通过
- 手工验证步骤：
  1. 运行 `npm run build` 后确认 `dist/icons/*` 存在。
  2. 在 `chrome://extensions` 加载 `dist/`，检查扩展图标显示正常。
  3. 打开 `site/privacy.html`，确认内容可访问。
  4. 检查 `docs/store` 下文档是否可直接用于填写商店表单。

## 7. 风险与回滚
- 已知风险：
  - 第三方图源许可证条款需持续关注，已记录来源与授权说明。
- 回滚策略：
  - 回退 `manifest` 图标声明与脚本改动，恢复旧流程。

## 8. 后续事项
- 待办项：
  - 替换占位截图为真实扩展截图（建议至少 3 张）。
  - 正式发布前将 `manifest.version` 升级到发布版本号（如 `0.1.1`）。
