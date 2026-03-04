# FEAT-041：README 首页对外展示优化 + GitHub Release ZIP 分发指南

## 1. 元信息
- 功能 ID：FEAT-041
- 功能名称：README 首页对外展示优化 + GitHub Release ZIP 分发指南
- 日期：2026-03-04
- 作者：Codex
- 分支：N/A

## 2. 概述
为了先通过 GitHub 给用户分发 zip（暂不上 Chrome 商店），重构 README 首页为“对外展示版”：
- 增加图标与封面图展示。
- 增加 `releases/latest` 下载入口。
- 明确用户安装步骤（从 GitHub 下载 zip 并加载）。
- 新增独立文档，沉淀 GitHub Release 的发版流程。

## 3. 需求映射
- 对应 PRD 章节：
  - 非功能需求：可维护性与交付清晰度
- 覆盖的用户场景：
  - 访客进入仓库首页，能够快速理解项目并完成下载安装。
  - 维护者能够按固定流程持续发布 zip 版本。
- 范围说明（In scope / Out of scope）：
  - In scope：
    - README 首页结构优化
    - 图片/图标可视化展示
    - GitHub Release ZIP 分发流程文档
  - Out of scope：
    - 自动化 CI 发版（如 GitHub Actions 自动发布 release）

## 4. 设计
- 关键设计决策：
  - 首页首屏突出“下载入口 + 视觉图 + 关键能力”。
  - 保留开发者文档入口，减少用户与开发者信息混杂。
  - 使用 `releases/latest` 作为稳定下载链接。

## 5. 实现
- 主要变更文件：
  - `README.md`
  - `docs/store/GITHUB_RELEASE_ZIP_GUIDE_ZH-CN.md`
  - `docs/store/README.md`
  - `docs/FEATURE_LOG.md`
- 核心逻辑：
  - README：
    - 顶部加入图标与封面图
    - 增加用户快速安装流程
    - 增加维护者发布流程和文档链接
  - store 文档：
    - 新增 GitHub Release ZIP 专用发布指南（中文）

## 6. 验证
- 自动化测试：
  - 本次主要为文档更新，无新增运行时代码逻辑
- 手工验证步骤：
  1. 在 GitHub 预览 README，确认图标与图片可正常显示。
  2. 点击 `releases/latest` 链接可到达下载页。
  3. 按指南执行一次 zip 生成和 release 上传流程。

## 7. 风险与回滚
- 已知风险：
  - 若仓库名或所有者变更，README 中链接需同步修改。
- 回滚策略：
  - 回退 README 与新增指南文件到上一版本。

## 8. 后续事项
- 待办项：
  - 可选引入 GitHub Actions 自动创建 release 草稿并上传 zip。
