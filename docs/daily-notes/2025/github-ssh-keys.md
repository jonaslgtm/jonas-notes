---
title: 配置 GitHub 的 SSH 密钥
description: '配置 GitHub 的 SSH 密钥'
date: 2025-11-06 09:23:15
tags: ["GitHub"]
---

# 配置 GitHub 的 SSH 密钥

::: tip 官方文档
[通过 SSH 连接到 GitHub](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh)
:::

给 Git SSH 添加 Key 的步骤如下：

## 1. 检查现有 SSH 密钥

- 打开 Git Bash。
- 输入 `ls -al ~/.ssh` 以查看是否存在现有的 SSH 密钥。

```bash
$ ls -al ~/.ssh
# 列出 .ssh 目录中的文件（如果存在）
```

检查目录列表以查看是否已经有 SSH 公钥。 默认情况下，GitHub 支持的公钥的文件名如下：

- id_rsa.pub
- id_ecdsa.pub
- id_ed25519.pub

如果收到错误，指示 ~/.ssh 不存在，可以生成新的 SSH 密钥。

## 2. 生成新的 SSH 密钥

可在本地计算机上生成新的 SSH 密钥。 生成密钥后，可将公钥添加到 GitHub.com 上的帐户中，以便通过 SSH 为 Git 操作启用身份验证。

::: tip 注意：

GitHub 通过在 2022 年 3 月 15 日删除旧的、不安全的密钥类型来提高安全性。

自该日期起，不再支持 DSA 密钥 (ssh-dss)。 无法在 GitHub 上向个人帐户添加新的 DSA 密钥。

2021 年 11 月 2 日之前带有 valid_after 的 RSA 密钥 (ssh-rsa) 可以继续使用任何签名算法。 在该日期之后生成的 RSA 密钥必须使用 SHA-2 签名算法。 一些较旧的客户端可能需要升级才能使用 SHA-2 签名。
:::

- 打开 Git Bash。

- 粘贴以下文本，将示例中使用的**电子邮件替换为 GitHub 电子邮件地址**。

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

::: tip 注意：

如果你使用的是不支持 Ed25519 算法的旧系统，请使用以下命令：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

:::

按照提示选择保存 Key 的路径和设置密码。

## 3. 将公钥添加到 GitHub

1. 打开生成的公钥文件，一般为 `~/.ssh/id_ed25519.pub`。将文件中的内容复制。

2. 登录 GitHub，点击右上角头像，选择 `Settings`。

3. 在左边菜单栏中选择 `SSH and GPG keys`，点击 `New SSH key` 创建一个新的 Key，将复制的公钥粘贴到 “Key” 输入框中，起个合适的 Title，然后点击 `Add SSH key` 即可。

## 4. 测试 SSH 连接

打开 Git Bash 或终端命令行工具，输入以下命令测试 SSH 连接是否成功：

```bash
ssh -T git@github.com
```

如果出现 `Hi your_username! You’ve successfully authenticated…` 的提示，说明连接成功。

有可能会看到类似如下警告：

```bash
> The authenticity of host 'github.com (IP ADDRESS)' can't be established.
> ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
> Are you sure you want to continue connecting (yes/no)?

```

只需输入 **yes** 确认即可，这表示你的 SSH 客户端正在建立与 GitHub 的安全连接。
