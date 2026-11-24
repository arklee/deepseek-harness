---
kind: upgrade-guide
description: "pi-ai 1.6 changes gateway defaults and the installed model catalog."
---

# pi-ai 1.6 gateway and model compatibility

English | [中文](guide.zh.md)

## Change

The pi-ai adapter uses version 1.6.0. Chat Completions sends reasoning models' system prompts as `system` outside `api.openai.com` unless configured otherwise. Requests without available tools omit `tools` even when history contains tool calls. The installed catalog removes unsupported models, including `openai-codex/gpt-5.5`, and updates provider endpoints and capabilities.

Anthropic replay digests use a new seed for the updated serializer. Previously recorded signed thinking is omitted on replay, except where manual thinking requires the open tool round's thinking; text and tool calls remain. Server-side message threads stay disabled.

## Migration

1. In the pi-ai plugin's provider or model `compat` settings in `cordis.patch.yml`, set `supportsDeveloperRole: true` only if your Chat Completions gateway requires the `developer` role.
2. If your gateway requires an empty tools array after tool calls, set `requiresToolsWithToolHistory: true` in those settings. Otherwise leave it unset.
3. Replace retired model selections with models offered by your provider. Verify a text request and a complete tool-call round through each configured gateway; check that the continuation succeeds without role or tools-field errors.
