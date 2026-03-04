# FEAT-033：聊天区宽度调节（设置滑杆）

## 1. 元信息
- 功能 ID：FEAT-033
- 功能名称：聊天区宽度调节（设置滑杆）
- 日期：2026-03-04
- 作者：Codex
- 分支：N/A

## 2. 概述
按顺序继续开发，补齐“聊天区宽度调节”能力。在设置中心新增宽度滑杆（64%~96% 视口），用户调整后即时作用于 ChatGPT 聊天内容与输入区宽度，无需刷新页面。

## 3. 需求映射
- 对应 PRD 章节：
  - FR-07 设置
- 覆盖的用户场景：
  - 用户希望减少左右留白或恢复默认阅读宽度。
- 范围说明（In scope / Out of scope）：
  - In scope：
    - 设置页新增宽度滑杆
    - 宽度设置本地持久化
    - 页面实时生效
  - Out of scope：
    - 按会话单独保存宽度
    - 多套宽度预设方案

## 4. 设计
- 关键设计决策：
  - 设置项新增 `chatContentWidthPercent`，取值范围 64~96。
  - 通过注入全局样式覆盖聊天容器与输入容器的 `max-width`。
  - 同时设置 `--thread-content-max-width` / `--composer-max-width` 变量，兼容不同页面结构。
- 取舍说明：
  - 先提供一个全局宽度值，避免设置复杂度快速膨胀。

## 5. 实现
- 主要变更文件：
  - `src/content/settingsStore.ts`
  - `src/content/App.tsx`
  - `src/content/index.tsx`
  - `README.md`
  - `PRD.md`
- 核心逻辑：
  - `settingsStore.ts`
    - 新增 `chatContentWidthPercent` 字段与 sanitize 范围校验。
  - `App.tsx`
    - 新增聊天宽度样式注入 effect（按设置实时更新）。
    - 设置中心新增宽度滑杆 + “恢复默认/一键加宽”按钮。
  - `index.tsx`
    - 新增滑杆样式 `gv-range` 与纵向设置项布局样式。
- 数据模型/存储变更：
  - `UserSettings` 新增 `chatContentWidthPercent`（默认 78）。

## 6. 验证
- 自动化测试：
  - `npm run typecheck`：通过
  - `npm run build`：通过
- 手工验证步骤：
  1. 打开设置中心，拖动“聊天区宽度”滑杆。
  2. 观察聊天内容区宽度即时变化。
  3. 切换页面或刷新后确认宽度保持。
  4. 点击“恢复默认”，确认回到默认宽度。

## 7. 风险与回滚
- 已知风险：
  - ChatGPT DOM class 结构调整时，宽度覆盖选择器可能需同步更新。
- 回滚策略：
  - 回退 `App.tsx` 宽度样式注入 effect 与 `settingsStore.ts` 新字段。

## 8. 后续事项
- 待办项：
  - 增加“仅会话页生效/全站生效”选项。
  - 增加宽度预设（紧凑/默认/宽屏）。
