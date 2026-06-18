---
type: finding
title: 2026 06 14 Gbrain Kimi Anthropic Bridge
status: deployed
audience:
  - operations
last-updated: '2026-06-14T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-13T23:40:38.174Z'
source_kind: 'mcp:put_page'
tags:
  - anthropic
  - deploy
  - env-override
  - full-deploy
  - gbrain
  - kimi
  - llm
  - smoke-test
---

# GBrain → Kimi Anthropic-Protocol Bridge (FULLY DEPLOYED 2026-06-14)

## Status: ✅ FULL DEPLOY (all 3 surfaces)

Vince picked option 3 after option 2's verification went clean. All gbrain
entry points now route LLM calls through Kimi instead of the broken
`sk-ant-v0-…` Anthropic key.

## Setup (anywhere gbrain runs)
```
export ANTHROPIC_BASE_URL="https://api.kimi.com/coding/v1"
export ANTHROPIC_API_KEY="<KIMI_API_KEY value>"
export GBRAIN_CHAT_MODEL="anthropic:kimi-for-coding"
```

`@ai-sdk/anthropic` reads `ANTHROPIC_BASE_URL` from env; gbrain's
`native-anthropic` branch never passes `baseURL` explicitly. Setting
`chat_model=anthropic:kimi-for-coding` keeps kimi's prompt cache active
(other model names work but bypass cache).

## Deployment surfaces (all done 2026-06-14 07:34 SGT)

| Surface | File | Status |
|---|---|---|
| Cron autopilot | `/root/scripts/gbrain-autopilot-cron.sh` | ✅ option 2 |
| PM2 `gbrain-mcp` | `/root/scripts/gbrain-mcp-start.sh` | ✅ option 3 |
| gbrain file config | `/root/.gbrain/config.json` | ✅ option 3 |

File perms locked: 700 (executable scripts with key), 600 (config.json with
db password).

## Verification (post-deploy)
- `gbrain config get chat_model` → `anthropic:kimi-for-coding` ✓
- gbrain-mcp PID 2721344, online, env has KIMI override
  (`/proc/2721344/environ`: ANTHROPIC_BASE_URL=https://api.kimi.com/coding/v1,
  ANTHROPIC_API_KEY=***, GBRAIN_CHAT_MODEL=anthropic:kimi-for-coding)
- Port 3050 reachable (HTTP 404 on /, expected — MCP paths are specific)
- Cron autopilot running 8+ min with new env, 0 x-api-key errors
- Earlier (option 2 verification, 06:24 SGT): full dream cycle ran end-to-end
  with 0 errors — lint, backlinks, sync, synthesize, extract, extract_facts,
  patterns, consolidate, propose_takes all "done"

## What's now fixed
- ✅ `gbrain-mcp` (PM2, port 3050) — subagent tool-loop calls route through
  kimi (was 401 before)
- ✅ `~/.gbrain/config.json` — `chat_model: anthropic:kimi-for-coding`
  persisted. File-plane `loadConfig` (used by CLI tools, `providers test`)
  now sees the chat_model
- ✅ Cron autopilot (since option 2)

## Still known: doctor warning is a false negative
Doctor still reports "this brain has no configured chat_model yet" in
`providers test` warnings — false negative from the
file-plane `loadConfig` warning string. Real chat path works fine
(verified). The doctor output is a known cosmetic issue in the warning
message; the underlying config is correct.

## Key quirk — model-name cache behavior
Kimi accepts arbitrary model names, but only `kimi-for-coding` gets
prompt caching. Curl-verified:

| model sent | response | cache_read_input_tokens |
|---|---|---|
| `kimi-for-coding` | "hello" | 14 (cache hit) |
| `claude-opus-4-7` | "hello" | 0 (no cache) |

## Reference
- HEARTBEAT 2026-06-13: "propose_takes shows 26 warnings of
  `[chat(anthropic:claude-sonnet-4-6)] invalid x-api-key`"
- Recipe source: `/root/gbrain/src/core/ai/recipes/anthropic.ts`
- Gateway code: `/root/gbrain/src/core/ai/gateway.ts:2038-2041`, `:2410-2413`
- AI SDK env var: `@ai-sdk/anthropic/dist/index.mjs:5409` (ANTHROPIC_BASE_URL)
