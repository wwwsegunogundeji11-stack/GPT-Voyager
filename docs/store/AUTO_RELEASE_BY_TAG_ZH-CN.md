# Tag 自动发布 ZIP（GitHub Actions）

最后更新：2026-03-04

## 1. 已配置工作流
- 文件：`.github/workflows/release-zip.yml`
- 触发条件：`push tag`，且标签名匹配 `v*`

## 2. 自动流程
当你推送标签后，GitHub Actions 会自动执行：
1. 安装依赖（`npm ci`）
2. 类型检查（`npm run typecheck`）
3. 构建扩展（`npm run build`）
4. 打包 ZIP（`scripts/package-release.ps1`）
5. 自动创建同名 GitHub Release
6. 上传打包好的 ZIP 作为 release 附件

## 3. 你需要做的事情
本地执行并推送标签：
```powershell
git add -A
git commit -m "chore: prepare release"
git push origin main

git tag -a v0.1.1 -m "release v0.1.1"
git push origin v0.1.1
```

## 4. 查看结果
- Actions 页面：`https://github.com/Duang777/GPT/actions`
- Release 页面：`https://github.com/Duang777/GPT/releases`

## 5. 注意事项
- 每次发布建议同步更新 `src/manifest.json` 的 `version`。
- 标签建议使用语义化版本（例如 `v0.1.1`、`v0.2.0`）。
