# GitHub Release ZIP 发布指南（中文）

最后更新：2026-03-04

## 场景
适用于“先不走 Chrome 商店，只通过 GitHub Release 分发 zip 安装包”。

## 1. 本地生成发布包
在项目根目录执行：
```powershell
npm run typecheck
npm run build
npm run package:zip
```

输出目录：
- `release/`

文件示例：
- `gpt-voyager-extension-20260304-192210.zip`

## 2. 创建 Git 标签（建议）
建议每次 release 对应一个语义化版本标签，例如 `v0.1.1`。

```powershell
git tag -a v0.1.1 -m "release v0.1.1"
git push origin v0.1.1
```

## 3. 在 GitHub 创建 Release
1. 打开仓库：`https://github.com/Duang777/GPT`
2. 进入 `Releases` -> `Draft a new release`
3. 选择或创建标签（如 `v0.1.1`）
4. 填写标题与更新说明
5. 上传 `release/*.zip` 文件作为附件
6. 点击 `Publish release`

## 4. 提供给用户的下载入口
- 最新版固定入口：`https://github.com/Duang777/GPT/releases/latest`
- 某个具体版本：`https://github.com/Duang777/GPT/releases/tag/v0.1.1`

## 5. 给用户的安装说明（可直接复制）
1. 从 Release 页面下载 zip 并解压。
2. 打开 `chrome://extensions/`。
3. 开启开发者模式。
4. 点击“加载已解压的扩展程序”。
5. 选择解压后的扩展目录（包含 `manifest.json`）。

## 6. 每次更新的最小清单
1. （建议）更新 `src/manifest.json` 的 `version`
2. 执行 `npm run typecheck && npm run build && npm run package:zip`
3. 新建 release 并上传最新 zip
4. 在 README 保持下载链接指向 `releases/latest`
