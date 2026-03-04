# FEAT-035：发布打包脚本与安装指引

## 1. 元信息
- 功能 ID：FEAT-035
- 功能名称：发布打包脚本与安装指引
- 日期：2026-03-04
- 作者：Codex
- 分支：N/A

## 2. 概述
针对“如何上线、如何给别人安装”需求，补充发布流程能力：
- 新增一键发布打包脚本 `npm run package:zip`。
- README 新增“发布打包、安装方式、上线建议”章节。

## 3. 需求映射
- 对应 PRD 章节：
  - 文档治理与交付可维护性要求
- 覆盖的用户场景：
  - 开发者需要快速生成可分发安装包。
  - 用户需要明确安装路径（本地加载 / release 包 / 商店发布）。

## 4. 设计
- 关键设计决策：
  - 使用 PowerShell `Compress-Archive` 在 Windows 环境打包。
  - 打包输出目录固定为 `release/`，并按时间戳命名。
- 取舍说明：
  - 先采用 Windows 方案贴合当前开发环境；跨平台可后续补充 Node 版打包脚本。

## 5. 实现
- 主要变更文件：
  - `scripts/package-release.ps1`
  - `package.json`
  - `.gitignore`
  - `README.md`
- 核心逻辑：
  - `npm run package:zip` 调用 `scripts/package-release.ps1`。
  - 脚本自动检查 `dist/` 是否存在，不存在则提示先构建。
  - 输出 `release/gpt-voyager-extension-<timestamp>.zip`。

## 6. 验证
- 自动化测试：
  - `npm run typecheck`：通过
  - `npm run build`：通过
- 手工验证步骤：
  1. 执行 `npm run build`。
  2. 执行 `npm run package:zip`。
  3. 检查 `release/` 下是否生成 zip。
  4. 按 README 安装步骤验证可加载。

## 7. 风险与回滚
- 已知风险：
  - `package:zip` 依赖 PowerShell，非 Windows 环境需替代实现。
- 回滚策略：
  - 回退 `package.json` 脚本和 `scripts/package-release.ps1`。

## 8. 后续事项
- 待办项：
  - 增加跨平台 Node 打包脚本。
  - 增加 GitHub Action 自动打包发布产物。
