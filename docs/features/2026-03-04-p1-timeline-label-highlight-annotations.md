# FEAT-030：会话时间线节点标签与高亮标注

## 1. 元信息
- 功能 ID：FEAT-030
- 功能名称：会话时间线节点标签与高亮标注
- 日期：2026-03-04
- 作者：Codex
- 分支：N/A

## 2. 概述
按顺序继续开发时间线能力。在已有“时间线浏览/定位/导出”基础上，新增节点级标注能力：
- 给时间线节点添加标签并保存。
- 给时间线节点添加高亮标记，并同步到聊天页面消息节点。
- 支持按标签筛选时间线节点。

## 3. 需求映射
- 对应 PRD 章节：
  - 6.2（P1）会话时间线节点标签与高亮标注
  - FR-10 时间线标注
- 覆盖的用户场景：
  - 用户在长对话中希望快速标记关键节点并回访。
  - 用户希望按标签聚焦某一类节点（如“结论”“TODO”“风险”）。
- 范围说明（In scope / Out of scope）：
  - In scope：
    - 节点标签新增/编辑/删除
    - 节点高亮开关
    - 页面消息节点高亮同步
    - 时间线标签筛选
    - 备份导入导出纳入时间线标注数据
  - Out of scope：
    - 标注协作与云同步
    - 标注权限与团队共享

## 4. 设计
- 关键设计决策：
  - 新增 `timelineAnnotationsStore` 做独立持久化，避免污染会话索引主结构。
  - 标注唯一键采用 `conversationId + timelineItemId`，同节点仅保留最新记录。
  - 页面高亮通过给消息节点打属性并注入全局样式实现，不改原始 DOM 结构。
- 取舍说明：
  - 未引入富文本批注（仅标签 + 高亮），优先低复杂度和稳定性。
- 权限/数据/隐私考虑：
  - 全部本地存储，不新增网络请求。

## 5. 实现
- 主要变更文件：
  - `src/content/timelineAnnotationsStore.ts`
  - `src/content/App.tsx`
  - `src/content/dataBackup.ts`
  - `src/content/index.tsx`
  - `README.md`
  - `PRD.md`
- 核心逻辑：
  - `timelineAnnotationsStore.ts`
    - 定义 `TimelineNodeAnnotation` 数据结构
    - 提供标签归一化、去重、load/save
  - `App.tsx`
    - 时间线项新增“高亮标注/标签标注”操作区
    - 标签编辑器支持保存与单标签移除
    - 新增标签筛选器与统计（高亮数、标注数）
    - 页面消息节点高亮同步（属性 + 全局样式）
    - 时间线导出附带标注元信息（标签筛选条件、节点标签/高亮）
    - JSON 备份导入导出新增 `timelineAnnotations`
  - `index.tsx`
    - 时间线标注相关样式（标签区、编辑器、状态徽标）
- 数据模型/存储变更：
  - 新增 `gpt_voyager_timeline_annotations_v1`
  - 备份 schema data 扩展：`timelineAnnotations`
- 配置/Manifest 变更：
  - 无

## 6. 验证
- 自动化测试：
  - `npm run typecheck`：通过
  - `npm run build`：通过
- 手工验证步骤：
  1. 打开会话时间线，给节点点击“高亮标注”。
  2. 确认页面对应消息出现高亮边框。
  3. 给节点添加多个标签并保存，确认节点卡片展示标签。
  4. 在筛选区选择标签，确认列表只保留命中节点。
  5. 导出时间线（MD/HTML），确认带有标签筛选与节点标注信息。
  6. 导出 JSON 备份再导入，确认标注恢复。
- 测试结果摘要：
  - 类型检查和构建通过，标注链路完整可用。

## 7. 风险与回滚
- 已知风险：
  - ChatGPT DOM 结构变动可能影响高亮属性的挂载目标。
- 回滚策略：
  - 回退 `timelineAnnotationsStore.ts` 与 `App.tsx` 标注逻辑。
  - 回退 `dataBackup.ts` 的 `timelineAnnotations` 字段扩展。

## 8. 后续事项
- 待办项：
  - 支持标签批量操作（批量加/删）。
  - 支持标注备注（短文本说明）。
- 潜在优化：
  - 支持标签颜色配置和快捷键标注。
