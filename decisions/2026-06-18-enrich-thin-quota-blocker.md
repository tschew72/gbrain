---
type: 'decision'
title: '2026 06 18 Enrich Thin Quota Blocker'
date: '2026-06-18T00:00:00.000Z'
status: 'blocked'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T02:06:55.508Z'
source_kind: 'mcp:put_page'
tags:
  - 'blocker'
  - 'enrich-thin'
  - 'gbrain'
  - 'kimi-quota'
created: '2026-06-18T00:00:00.000Z'
---

# enrich_thin — Kimi quota exhausted, can't enrich today

## TL;DR

`cycle.enrich_thin.enabled = true` since 2026-06-18. All config / pricing /
candidate-selection work landed. Chat layer proven (real $$ spent). But every
enrich call fails inside the LLM with **Kimi "quota exceeded"** — so the daemon
cycles silently no-op.

## What I changed (working tree clean, no committed code changes)

| Key | Before | After |
| --- | --- | --- |
| `cycle.enrich_thin.enabled` | unset (off) | `true` |
| `config.chat_model` (DB) | `minimax:MiniMax-M3` | `anthropic:claude-haiku-4-5` |
| `config.models.chat` (DB) | `minimax:MiniMax-M3` | `anthropic:claude-haiku-4-5` |

`model-pricing.ts` already had both `anthropic:kimi-for-coding` and
`anthropic:claude-haiku-4-5` priced (commit 57beb779 — landed earlier today
during fleet-customizations). No code edits needed for pricing.

## Root cause chain (traced today)

1. **Config on** → `cycle.enrich_thin.enabled = true` (DB plane).
2. **Types mismatch fixed earlier** → 0 → 10 candidates per dry-run.
3. **Pricing entries present** for both `anthropic:kimi-for-coding` ($1/$3) and
   `anthropic:claude-haiku-4-5` ($1/$5). No `no_pricing` BudgetExhausted.
4. **Chat layer proven**: `gbrain enrich --types entity --limit 1` with kimi
   env spent **$0.012** on a real synthesis call. So the path works
   end-to-end when the upstream API is reachable.
5. **The actual blocker** (found by adding temporary stderr logging to
   `enrich.ts` then reverting): when the call is routed through the daemon's
   env (cron wrapper exports `GBRAIN_CHAT_MODEL=anthropic:kimi-for-coding` +
   kimi base URL + kimi API key), kimi.com rejects with:

   > `You've reached your usage limit for this billing cycle. Your quota will
   > be refreshed in the next cycle. Upgrade to get more: …`

   The first call after quota refresh worked ($0.012) but later calls hit the
   ceiling. The cron daemon 2066281 (started 10:00 SGT) inherits these env
   vars and silently fails every chat call.

## Why my DB config changes don't help the daemon yet

`autopilot` calls `configureGateway(buildGatewayConfig(loadConfig()))` once at
startup (cli.ts:2081) and never re-runs `reconfigureGatewayWithEngine(engine)`.
So DB-plane config changes (`chat_model`, `models.chat`) are invisible to a
running daemon — only the file config + env at startup time matter.

To make the daemon actually pick up the new `models.chat`, two paths:

1. **Change cron wrapper** (`/root/scripts/gbrain-autopilot-cron.sh`) to drop
   the kimi env override and let file/DB config win — but file config still
   has `minimax:MiniMax-M3` (M3 has **no chat touchpoint** in
   `recipes/minimax.ts`, so this path also silently no-ops).
2. **Add a working API key** for one of: Anthropic (real key), OpenAI,
   Google Gemini, or top up Kimi quota.

## Files / commits

- `/root/.gbrain/checkout/decisions/2026-06-18-enable-enrich-thin.md` —
  original "flip on" decision (today, 09:01 SGT)
- `runtime/fleet-customizations` branch tip: `57beb779 fix(pricing): add
  MiniMax-M3 and kimi-for-coding to CANONICAL_PRICING`
- No working-tree edits remain (debug logging in `enrich.ts` was reverted)

## Options for Vince

1. **Top up Kimi quota** — wait for billing-cycle refresh, or upgrade the
   plan. Once quota is back, the daemon needs a restart (current one will
   keep failing).
2. **Add a real API key** for a non-Kimi provider (Anthropic / OpenAI /
   Gemini) — populate `~/.zshenv` or DB-plane `chat_model`, restart daemon.
3. **Hold `cycle.enrich_thin.enabled = false`** until one of the above.
