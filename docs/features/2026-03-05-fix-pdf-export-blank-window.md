# FIX-005：修复 PDF 导出空白窗口

## 1. 元信息
- 功能 ID：FIX-005
- 功能名称：修复 PDF 导出空白窗口
- 日期：2026-03-05
- 作者：Codex
- 分支：main

## 2. 问题描述
用户反馈点击“导出 PDF”后打开空白窗口，无法进入打印保存流程。

## 3. 根因
原实现通过 `window.open('', '_blank', 'noopener,noreferrer') + document.write(...)` 注入导出文档。
在部分浏览器环境/页面策略下，`document.write` 注入的内容可能被拦截或未正确渲染，导致新窗口空白。

## 4. 修复方案
- 将 PDF 导出改为：
  1. 构建打印文档 HTML。
  2. 生成 `Blob URL`。
  3. `window.open(blobUrl, '_blank')` 打开新标签页。
- 打印脚本增强：
  - 等待页面图片加载完成后再调用 `window.print()`，避免图片尚未就绪。
- 增加 Blob URL 回收，避免长期占用内存。

## 5. 影响文件
- `src/content/conversationExport.ts`
- `docs/FEATURE_LOG.md`

## 6. 验证
- 自动化：
  - `npm run typecheck` 通过
  - `npm run build` 通过
- 手工：
  1. 点击“导出 PDF”能打开带内容的页面（不再空白）。
  2. 打印窗口可正常弹出并保存为 PDF。

## 7. 回滚
- 回退 `src/content/conversationExport.ts` 到修复前版本。
