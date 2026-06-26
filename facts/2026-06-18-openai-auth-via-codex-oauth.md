---
type: 'fact'
title: 'OpenAI auth on Evvo fleet is via Codex runtime + ChatGPT OAuth, NOT API key'
captured_at: '2026-06-18T03:58:00.000Z'
captured_via: 'capture-cli'
ingested_via: 'put_page'
ingested_at: '2026-06-18T03:59:12.121Z'
source_kind: 'put_page'
created: '2026-06-18T03:59:12.121Z'
---

# OpenAI auth on Evvo fleet is via Codex runtime + ChatGPT OAuth, NOT API key

**Source:** Vince (crypt0_knight) in #agents, 2026-06-18 11:57 SGT
**Verified by:** inspection of OpenClaw 2026.6.8 dist + `~/.codex/auth.json`

## Mechanism
- **Codex CLI** installed at `/usr/bin/codex` (v0.139.0)
- **`~/.codex/auth.json`** holds ChatGPT OAuth tokens (`id_token`, `last_refresh`)
- Tied to `vince@infinitevalueventures.com` (Google sign-in to ChatGPT)
- OpenClaw auto-installs the `codex` runtime plugin when an OpenAI model is selected (see `CODEX_RUNTIME_PLUGIN_ID = "codex"` in `auth-choice-BgrCDx81.js`)
- Routing: `if (provider === "openai" && runtime === "codex") return "codex";` in `agent-runner.runtime-BapylDFW.js`
- Codex runtime plugin reads `~/.codex/auth.json` and uses the OAuth bearer to call OpenAI APIs

## What this means
- **No `OPENAI_API_KEY` env var needed** for any `openai/*` model (gpt-4o, gpt-4o-mini, gpt-5.4, gpt-5.5, gpt-oss-120b)
- The "API key" in codex auth.json is `null` — auth_mode is OAuth, not bearer
- If Codex CLI logs out or auth.json expires, OpenAI calls fail → agent cascades through fallback chain

## Counter-misconception
Earlier I (Max) wrongly assumed OpenAI needed `OPENAI_API_KEY` env. This was based on standard OpenAI usage, not the Codex runtime plugin path. Lesson: when the OpenClaw dist code shows `codex` runtime handling `openai` provider, trust the plugin mechanism over generic OpenAI docs.

## Related
- `inbox/2026-06-18-hunt-model-chain-sonnet-fallback` — Hunt model chain
- `decisions/2026-06-18-max-hunt-gpt-4o-mini-chain` — Max + Hunt → gpt-4o-mini

tags: [openai, codex, oauth, auth, openclaw, runtime, model, fact]
---
