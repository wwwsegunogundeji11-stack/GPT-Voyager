# FEAT-032：Mermaid 图表收藏与多格式导出

## 1. 元信息
- 功能 ID：FEAT-032
- 功能名称：Mermaid 图表收藏与多格式导出
- 日期：2026-03-04
- 作者：Codex
- 分支：N/A

## 2. 概述
按路线图继续开发 Mermaid 能力，在已有“识别/预览/复制/定位”基础上，新增：
- 图表收藏与别名管理。
- 图表导出能力（源码 `.mmd`、`SVG`、`HTML`）。
- 备份导入导出纳入图表收藏数据。

## 3. 需求映射
- 对应 PRD 章节：
  - 6.2（P1）Mermaid 图表收藏与多格式导出
  - FR-09 图表工作台
- 覆盖的用户场景：
  - 用户希望在长会话中收藏常用图表并复用。
  - 用户希望将图表导出到文档或设计流程中使用。
- 范围说明（In scope / Out of scope）：
  - In scope：
    - 工作台图表收藏/取消收藏
    - 收藏列表检索、别名编辑、定位来源、删除
    - 源码/SVG/HTML 导出
    - 备份导入导出支持图表收藏
  - Out of scope：
    - 图表在线分享链接
    - 图表版本历史

## 4. 设计
- 关键设计决策：
  - 新增独立 `mermaidFavoritesStore`，避免与会话索引耦合。
  - 导出 SVG/HTML 时优先复用当前缓存渲染结果，缺失时再临时渲染。
  - 收藏去重键采用 `conversationId + normalized(code)`，避免同图重复收藏。
- 取舍说明：
  - 暂不提供批量导出，先保证单图导出链路完整稳定。
- 权限/数据/隐私考虑：
  - 本地存储 + 本地下载，不新增网络请求。

## 5. 实现
- 主要变更文件：
  - `src/content/mermaidFavoritesStore.ts`
  - `src/content/App.tsx`
  - `src/content/dataBackup.ts`
  - `src/content/index.tsx`
  - `README.md`
  - `PRD.md`
- 核心逻辑：
  - `mermaidFavoritesStore.ts`
    - 新增收藏数据结构 `MermaidFavorite`
    - 支持清洗、持久化、去重匹配
  - `App.tsx`
    - Mermaid 项目新增“收藏图表/取消收藏”
    - 新增图表收藏列表（搜索、别名、定位、删除）
    - 新增导出：源码、SVG、HTML
    - 备份导入导出扩展 `mermaidFavorites`
  - `dataBackup.ts`
    - 备份 schema 扩展图表收藏字段并兼容旧备份
  - `index.tsx`
    - 新增 Mermaid 收藏区样式
- 数据模型/存储变更：
  - 新增 `gpt_voyager_mermaid_favorites_v1`
  - 备份 `data` 新增 `mermaidFavorites`
- 配置/Manifest 变更：
  - 无

## 6. 验证
- 自动化测试：
  - `npm run typecheck`：通过
  - `npm run build`：通过
- 手工验证步骤：
  1. 在 Mermaid 工作台点击“收藏图表”。
  2. 在“图表收藏”列表中编辑别名并搜索命中。
  3. 分别导出源码/SVG/HTML，确认文件可打开。
  4. 点击“定位来源/打开来源会话”验证跳转。
  5. 执行 JSON 备份导出再导入，确认图表收藏恢复。
- 测试结果摘要：
  - 收藏、导出、定位、备份链路均可用。

## 7. 风险与回滚
- 已知风险：
  - 个别 Mermaid 语法错误场景会导致 SVG/HTML 导出失败。
- 回滚策略：
  - 回退 `mermaidFavoritesStore.ts` 及 `App.tsx` 相关 UI/回调。
  - 回退 `dataBackup.ts` 中 `mermaidFavorites` 字段扩展。

## 8. 后续事项
- 待办项：
  - 支持 Mermaid 收藏批量导出。
  - 支持收藏分组与标签。
- 潜在优化：
  - 导出 HTML 支持主题选择（浅色/深色）。
