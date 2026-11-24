---
kind: upgrade-guide
description: "pi-ai 1.6 更改网关默认行为和已安装的模型目录。"
---

# pi-ai 1.6 网关与模型兼容性

[English](guide.md) | 中文

## 变更

pi-ai 适配器使用 1.6.0 版本。除非另行配置，Chat Completions 在 `api.openai.com` 以外的端点将推理模型的系统提示词作为 `system` 发送。没有可用工具的请求会省略 `tools`，即使历史中包含工具调用。已安装的目录移除了不受支持的模型，包括 `openai-codex/gpt-5.5`，并更新了提供方端点和能力。

Anthropic 重放摘要为更新后的序列化器使用新的种子。重放时会省略先前记录的签名思考，但手动思考模式要求保留的未完成工具轮次思考除外；文本和工具调用仍然保留。服务端 message threads 保持禁用。

如果目录路由显式设置了 `baseURL`，只有该地址与目录端点同源且使用 HTTPS 时，才可使用提供方已保存的 OAuth 授权凭据。这一限制同样适用于共享同一 Harness 主目录的其他 profile 获取的授权凭据。

## 迁移

1. 仅当 Chat Completions 网关要求 `developer` 角色时，在 `cordis.patch.yml` 中 pi-ai 插件的提供方或模型 `compat` 设置内设置 `supportsDeveloperRole: true`。
2. 如果网关要求在工具调用之后发送空工具数组，在这些设置内设置 `requiresToolsWithToolHistory: true`。否则保持未设置。
3. 将退役的模型选择替换为提供方提供的模型。通过每个已配置网关验证文本请求和完整的工具调用轮次；确认继续执行时没有角色或工具字段错误。
4. 如果网关原本使用目录提供方的 OAuth 授权凭据，请改用网关签发的 API 密钥。如需通过 OAuth 直连提供方，请移除 `baseURL` 覆盖并发送请求确认成功。
