---
type: 'decision'
title: 'Max + Hunt upgraded to gpt-5.4-mini → gpt-5.5 → claude-sonnet-4-6 (2026-06-18)'
captured_at: '2026-06-18T04:47:00.000Z'
captured_via: 'capture-cli'
ingested_via: 'put_page'
ingested_at: '2026-06-18T04:47:49.136Z'
source_kind: 'put_page'
created: '2026-06-18T04:47:49.136Z'
---

# Max + Hunt upgraded to gpt-5.4-mini → gpt-5.5 → claude-sonnet-4-6

**Date:** 2026-06-18 12:46 SGT
**Decider:** Vince (crypt0_knight) via #agents Discord
**Executor:** Max

## Change
Both `main` (Max) and `hunt` (Hunt) agents reconfigured to:

- **primary**: `openai/gpt-5.4-mini`
- **fallback 1**: `openai/gpt-5.5`
- **fallback 2**: `anthropic/claude-sonnet-4-6`

## Context
- Upgraded from previous `openai/gpt-4o-mini` → `openai/gpt-4o` → `claude-cli/claude-sonnet-4-6` chain (set ~1 hour ago at 11:48 SGT)
- Vince wanted to move to GPT-5 family for better quality + still cost-effective via `gpt-5.4-mini`
- Note: `anthropic/claude-sonnet-4-6` (no `claude-cli/` prefix) — different registry entry than `claude-cli/claude-sonnet-4-6`, but both go through the same claude-cli OAuth auth
- Backup at `/root/.openclaw/openclaw.json.bak-pre-gpt5-chain-2026-06-18`

## Auth (verified)
- `gpt-5.4-mini` / `gpt-5.5` → Codex runtime plugin + ChatGPT OAuth (`~/.codex/auth.json`)
- `anthropic/claude-sonnet-4-6` → claude-cli OAuth (Claude Max subscription)
- No env keys needed (see `facts/2026-06-18-openai-auth-via-codex-oauth`)

## Risk
- Live Max session (this one) and live Hunt session still on pre-restart models. Will pick up gpt-5.4-mini on next session spawn.
- gpt-5 family is newer — if any tool calls fail in unexpected ways, may need to fall back to gpt-4o chain.

## Related
- `decisions/2026-06-18-max-hunt-gpt-4o-mini-chain` — earlier gpt-4o-mini chain
- `facts/2026-06-18-openai-auth-via-codex-oauth` — auth mechanism

tags: [openclaw, model, max, hunt, gpt-5, claude-sonnet-4-6, decision, upgrade]
---
