# FEAT-028：点击页面公式复制升级（Word 优先 + LaTeX 回退 + 页面反馈）

## 1. 元信息
- 功能 ID：FEAT-028
- 功能名称：点击页面公式复制升级（Word 优先 + LaTeX 回退 + 页面反馈）
- 日期：2026-03-04
- 作者：Codex
- 分支：N/A

## 2. 概述
根据用户反馈，本次将“点击页面公式复制”从仅复制 LaTeX 升级为“优先复制可直接粘贴 Word 渲染的 MathML（HTML 剪贴板），失败自动回退 LaTeX”，并优化点击后公式高亮框与就地提示，明确显示“已复制 Word”或“已复制 LaTeX”。

## 3. 需求映射
- 对应 PRD 章节：
  - 6.2（P1：公式复制支持 LaTeX 与 MathML）
  - 8（FR-07 设置）
- 覆盖的用户场景：
  - 用户点击聊天页面公式后，希望直接可粘贴到 Word 渲染。
  - 当 Word 复制链路不可用时，仍希望快速得到 LaTeX 文本。
- 范围说明（In scope / Out of scope）：
  - In scope：
    - 页面点击公式：Word(MathML) 优先复制
    - Word 复制失败自动回退 LaTeX
    - 公式区域高亮框样式优化
    - 页面内反馈文案区分 Word / LaTeX
  - Out of scope：
    - OMML 专用格式输出
    - 非 Chromium 浏览器兼容策略扩展

## 4. 设计
- 关键设计决策：
  - 仅当 `ClipboardItem + text/html` 写入成功时判定为 Word 复制成功。
  - 若写入失败，直接回退 LaTeX，避免“误报 Word 成功”。
  - 页面反馈按复制结果切换视觉：Word（绿色）/ LaTeX（蓝色）。
- 取舍说明：
  - 放弃“仅复制 MathML 文本也判成功”的策略，优先保证提示语义真实。
- 权限/数据/隐私考虑：
  - 仅本地剪贴板写入，不新增权限与网络请求。

## 5. 实现
- 主要变更文件：
  - `src/content/App.tsx`
  - `README.md`
- 核心逻辑：
  - `copyWordMathSource`：
    - Word 复制成功条件收紧为 HTML 剪贴板写入成功。
    - 失败路径统一回退 LaTeX。
  - `showPageFormulaCopyFeedback`：
    - 新增结果感知样式（Word/LaTeX 不同颜色）
    - 就地浮层提示“已复制 Word / 已复制 LaTeX”
  - 设置文案同步为“Word 优先，失败回退 LaTeX”。

## 6. 验证
- 自动化测试：
  - `npm run typecheck`：通过
  - `npm run build`：通过
- 手工验证步骤：
  1. 打开含公式的 ChatGPT 对话。
  2. 点击页面公式，观察公式区域高亮与提示文案。
  3. 在 Word 粘贴，确认成功渲染时提示为“已复制 Word”。
  4. 在不支持 HTML 剪贴板场景验证回退提示为“已复制 LaTeX”。
- 测试结果摘要：
  - 功能行为与反馈文案一致，无类型与构建错误。

## 7. 风险与回滚
- 已知风险：
  - 某些环境的剪贴板权限策略会触发更频繁的 LaTeX 回退。
- 回滚策略：
  - 回退 `App.tsx` 的页面点击复制策略与页面反馈样式。

## 8. 后续事项
- 待办项：
  - 支持用户可配置复制优先级（Word / LaTeX）。
- 潜在优化：
  - 在设置中增加“最近一次复制类型统计”。
