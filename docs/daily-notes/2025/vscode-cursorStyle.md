---
title: 自定义 VS Code 编辑器光标颜色和显示效果
description: 自定义 VS Code 编辑器光标颜色和显示效果
date: 2025-10-23 14:22:31
tags:
  - VS Code
---

# 自定义 VS Code 编辑器光标颜色和显示效果

::: tip 我的配置

```json
"workbench.colorCustomizations": {
    "editorCursor.foreground": "#00FF00" //自定义光标颜色
},
"editor.cursorBlinking": "smooth", //控制光标的闪烁效果
"editor.cursorSmoothCaretAnimation": "on",//开启光标平滑移动动画效果
```

:::

## 自定义光标颜色

### 1. 打开设置文件

使用快捷键 `Ctrl + ,` (Windows/Linux) 或 `Cmd + ,` (Mac) 打开设置界面，然后点击右上角的 **打开设置 (json) 图标**。

### 2. 添加配置代码

在打开的 settings.json 文件中的大括号 { } 内，添加以下配置：

```json
"workbench.colorCustomizations": {
    //自定义光标颜色
    "editorCursor.foreground": "#00FF00"
},

```

### 3. 保存生效

保存文件后，新的光标颜色通常会立即生效。

## 自定义光标样式

### 1. 形状

```json
//定义光标的基本形状
"editor.cursorStyle": "line",

```

可选项：

- `line`（竖线）
- `block`（块状）
- `underline`（下划线）

### 2. 宽度（粗细）

```json
//定义光标的基本宽度（粗细）
"editor.cursorWidth": 3,

```

### 3. 闪烁效果

```json
//控制光标的闪烁效果
"editor.cursorBlinking": "smooth",

```

可选项:

- `blink` 默认设置，光标在可见和不可见之间平滑切换。
- `smooth` 光标会像呼吸一样平滑地淡入淡出，许多用户觉得这种效果更流畅、更现代。
- `phase` 光标以相位差的方式闪烁，即在不同步的状态下进行闪烁。
- `expand` 一种特殊效果，光标会在闪烁时伴有类似"扩展"或"冒烟"的动画。
- `solid` 光标完全不闪烁，始终保持可见状态。

### 4.平滑移动效果

```json
//用于开启或关闭光标平滑移动动画效果
"editor.cursorSmoothCaretAnimation": "on"

```
