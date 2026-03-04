# FEAT-042：Tag 自动发布 ZIP + README 截图区精简

## 1. 元信息
- 功能 ID：FEAT-042
- 功能名称：Tag 自动发布 ZIP + README 截图区精简
- 日期：2026-03-04
- 作者：Codex
- 分支：N/A

## 2. 概述
根据“先 GitHub Release 分发 zip，并自动化生成”的需求，新增 tag 驱动的自动发布流程；同时按反馈删除 README 中不需要的截图预览占位区块。

## 3. 需求映射
- 对应 PRD 章节：
  - 交付与分发流程（工程化）
- 覆盖的用户场景：
  - 维护者希望推送标签后自动生成并上传 ZIP 到 Release。
  - 首页展示要简洁，不展示占位截图块。

## 4. 实现
- 主要变更文件：
  - `.github/workflows/release-zip.yml`
  - `README.md`
  - `docs/store/AUTO_RELEASE_BY_TAG_ZH-CN.md`
  - `docs/store/README.md`
- 核心逻辑：
  - `release-zip.yml`：
    - 监听 `v*` 标签推送
    - 自动执行 `npm ci/typecheck/build`
    - 自动打包 ZIP 并创建对应 GitHub Release，上传附件
  - `README.md`：
    - 移除截图预览占位区块，仅保留封面图和下载入口

## 5. 验证
- 自动化测试：
  - `npm run typecheck`：通过
- 手工验证：
  1. 检查 README 不再包含截图占位区块。
  2. 检查 workflow 文件触发条件为 `push tags v*`。

## 6. 风险与回滚
- 风险：
  - 若标签命名不符合 `v*`，不会触发自动发布。
- 回滚：
  - 回退 `.github/workflows/release-zip.yml` 与 README 本次变更。

## 7. 后续事项
- 可选增加 `workflow_dispatch` 手动触发入口。
