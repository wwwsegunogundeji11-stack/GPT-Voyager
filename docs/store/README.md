# Web Store 上线资料包

本目录用于集中管理 Chrome Web Store 上线所需资料。

## 文件说明
- `PUBLISH_CHECKLIST_ZH-CN.md`：上线操作清单（从打包到提交审核）
- `GITHUB_RELEASE_ZIP_GUIDE_ZH-CN.md`：GitHub Release ZIP 分发指南（不走商店）
- `AUTO_RELEASE_BY_TAG_ZH-CN.md`：推送 tag 后自动生成 ZIP Release 的说明
- `WEBSTORE_LISTING_COPY_ZH-CN.md`：商店文案（可直接粘贴）
- `ASSET_GUIDE_ZH-CN.md`：素材生成与替换说明
- `ICON_ATTRIBUTION.md`：图标来源与授权说明

## 常用命令
```powershell
npm run icons:prepare
npm run webstore:assets
npm run build
npm run package:zip
```
