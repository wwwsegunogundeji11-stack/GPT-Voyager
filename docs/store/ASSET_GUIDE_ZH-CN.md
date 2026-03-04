# 商店素材说明（Web Store Assets）

## 1. 已自动生成素材
执行：
```powershell
npm run webstore:assets
```
会生成以下文件：
- `assets/webstore/small-promo-440x280.png`
- `assets/webstore/marquee-1400x560.png`
- `assets/webstore/screenshot-01-1280x800.png`（占位模板）

## 2. 图标文件
扩展图标位于：
- `src/icons/icon-16.png`
- `src/icons/icon-32.png`
- `src/icons/icon-48.png`
- `src/icons/icon-128.png`

如需重拉瓶子图标并重新生成：
```powershell
npm run icons:prepare
```

## 3. 截图建议（审核更稳）
- 用真实扩展界面替换 `screenshot-01-1280x800.png` 占位图。
- 至少准备 3 张截图，覆盖：
  - 会话索引页
  - 提示词库页
  - 公式/图表工作台页

## 4. 命名建议
- `screenshot-01-conversation-1280x800.png`
- `screenshot-02-prompts-1280x800.png`
- `screenshot-03-formula-mermaid-1280x800.png`

## 5. 上传顺序建议
1. 先上传图标（128）
2. 上传小宣传图（440x280）
3. 上传 marquee（如 Dashboard 显示为可选则可后补）
4. 最后上传真实截图
