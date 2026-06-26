---
type: 'decision'
title: 'Max + Hunt model chain: gpt-4o-mini → gpt-4o → claude-sonnet-4-6 (2026-06-18)'
captured_at: '2026-06-18T03:48:00.000Z'
captured_via: 'capture-cli'
ingested_via: 'put_page'
ingested_at: '2026-06-18T03:48:28.821Z'
source_kind: 'put_page'
created: '2026-06-18T03:48:28.821Z'
---

# Max + Hunt model chain: gpt-4o-mini → gpt-4o → claude-sonnet-4-6

**Date:** 2026-06-18 11:48 SGT
**Decider:** Vince (crypt0_knight) via #agents Discord
**Executor:** Max (Max)

## Change
Both `main` (Max) and `hunt` (Hunt) agents reconfigured to:

- **primary**: `openai/gpt-4o-mini`
- **fallback 1**: `openai/gpt-4o`
- **fallback 2**: `claude-cli/claude-sonnet-4-6`

## Context
- Previously: Max on `claude-sonnet-4-6` (per-agent), Hunt on `openai/gpt-4o` with fallbacks `[gpt-4o-mini, zai/glm-5.1]`
- Vince wants both agents on a consistent cost-optimized chain — gpt-4o-mini as cheap default, gpt-4o for harder work, Sonnet OAuth as safety net
- Gateway default (`agents.defaults.model`) unchanged at `claude-cli/claude-sonnet-4-6` — this change is per-agent only

## Risk
- `OPENAI_API_KEY` not detected in env. If not configured in 1Password or another vault, both OpenAI tiers will fail and agents cascade to Sonnet.
- Live Max session (this one) and live Hunt session still on pre-restart models (Max: sonnet-4-6, Hunt: kimi-for-coding). Will pick up gpt-4o-mini on next session spawn.

## Related
- `inbox/2026-06-18-1a8889d2` — hot-reload doesn't switch session models
- `inbox/2026-06-18-full-restart-no-model-switch` — full restart also doesn't switch session models
- `inbox/2026-06-18-hunt-model-chain-sonnet-fallback` — earlier Hunt state

tags: [openclaw, model, max, hunt, openai, gpt-4o-mini, claude-sonnet-4-6, decision]
---
