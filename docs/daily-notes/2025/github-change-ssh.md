---
title: 解决 Github 同步本地分支时报错
date: 2025-09-18 12:03:15
tags: ["GitHub","VS Code"]
---

# 解决 Github 同步本地分支时报错

::: danger 遇到的问题
Github 同步本地分支时报错，无法使用 VSCode 将本地版本同步到 github

从网络找到的方法，并添加自己的理解和实操。
:::

## 报错信息

```bash
Git:fatal: unable to access 'https://github.com/xxx.git/': Failed to connect to github.com port 443 after 75007 ms: Couldn't connect to server
```

## :star: 前提条件：已配置 SSH Key

详细教程：[配置 GitHub 的 SSH 密钥](github-ssh-keys)

## 解决方法

将 git config 中的 remote.origin.url **从 HTTPS 改成 SSH**

## 具体步骤

### 1、查看 git config

```bash
> git config --list
...
remote.origin.url=https://github.com/xxx/xxxx.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.main.remote=origin

...

```

### 2、修改 remote url

复制 Github 上对应仓库的 SSH 路径，使用下面命令修改：

```bash

> git remote set-url origin git@github.com:xxx.git
> git config --list
...
remote.origin.url=git@github.com:xxx/xxxx.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.main.remote=origin

...

```

可以看到 remote.origin.url 已经修改为 SSH 路径，再次同步就成功了！

::: tip 注：

这里的 `origin` 是远程存储库名称，按照自己的设置，通常设置为 github 或 origin 。
:::
