# Chrome Web Store 上线清单（中文）

最后更新：2026-03-04

## 0. 你现在已有的产物
- 扩展包构建脚本：`npm run build`
- 扩展发布 zip 脚本：`npm run package:zip`
- 图标资源：`src/icons/icon-16.png` / `32` / `48` / `128`
- 隐私政策页面：`site/privacy.html`（可部署为公开 URL）
- 商店素材模板：`assets/webstore/*`

## 1. 发布前准备（本地）
1. 执行质量检查与打包：
```powershell
npm run typecheck
npm run build
npm run package:zip
```
2. 确认最新 zip 在 `release/` 目录。
3. 如需重做图标/素材：
```powershell
npm run icons:prepare
npm run webstore:assets
```

## 2. Chrome Developer Dashboard
1. 使用将要发布的 Google 账号登录。
2. 确认账号已开启 2-Step Verification（必须）。
3. 首次发布账号完成开发者注册。

## 3. 新建并上传扩展
1. `Add new item`。
2. 上传 `release/*.zip` 最新包。
3. 进入编辑页面后按以下标签页填写：
  - Store Listing
  - Privacy
  - Distribution

## 4. Store Listing 建议填写
1. 扩展名：`GPT Voyager`
2. Summary（短描述）：见 `WEBSTORE_LISTING_COPY_ZH-CN.md`
3. Description（长描述）：见 `WEBSTORE_LISTING_COPY_ZH-CN.md`
4. 图标：`src/icons/icon-128.png`
5. 宣传图：
  - `assets/webstore/small-promo-440x280.png`
  - `assets/webstore/marquee-1400x560.png`
6. 截图：
  - 可先使用 `assets/webstore/screenshot-01-1280x800.png` 占位
  - 建议替换为真实扩展界面截图再提交审核

## 5. Privacy 标签
1. 隐私政策 URL 填部署后的链接（推荐 GitHub Pages）：
  - `https://<你的用户名>.github.io/GPT/privacy.html`
2. 数据处理声明可参考：
  - `docs/store/WEBSTORE_LISTING_COPY_ZH-CN.md` 的“隐私声明建议”

## 6. Distribution 标签
1. 首发建议选 `Unlisted`（先灰度）。
2. 国家/地区先选目标用户范围。
3. 审核通过后再切 `Public`。

## 7. 提交与发布
1. 点击 `Submit for review`。
2. 可选 “审核通过后自动发布”。
3. 审核通过后获取商店链接分享给用户。

## 8. 后续更新流程
1. 更新版本号：`src/manifest.json -> version`（例如 `0.1.0` -> `0.1.1`）。
2. 重复“构建 -> 打包 -> 上传 -> 审核”流程。

## 9. 常见卡点
1. `version` 未提升：新包无法上传。
2. 隐私政策 URL 不可访问：审核常被打回。
3. 截图与实际功能不符：审核风险高。
4. 文案宣称与权限不一致：审核风险高。

## 10. 官方文档（建议提交前过一遍）
- 发布流程：`https://developer.chrome.com/docs/webstore/publish/`
- 开发者注册：`https://developer.chrome.com/docs/webstore/register/`
- 账号设置：`https://developer.chrome.com/docs/webstore/set-up-account`
- 分发配置（Public/Unlisted）：`https://developer.chrome.com/docs/webstore/cws-dashboard-distribution/`
- 审核流程：`https://developer.chrome.com/docs/webstore/review-process/`
- 上架素材要求：`https://developer.chrome.com/docs/webstore/images`
