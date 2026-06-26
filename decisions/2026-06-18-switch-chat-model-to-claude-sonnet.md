---
type: 'decision'
title: 'Switch chat model to Claude Sonnet 4-6'
status: 'partial — config flipped, calls still failing'
ingested_at: '2026-06-18T02:50:57.719Z'
ingested_via: 'put_page'
source_kind: 'put_page'
tags:
  - 'chat-model'
  - 'claude-sonnet'
  - 'enrich_thin'
  - 'gbrain'
created: '2026-06-18T02:50:57.719Z'
---

# Switch chat model to Claude Sonnet 4-6

## What changed (2026-06-18 10:46 SGT)
- `chat_model` (DB plane) → `anthropic:claude-sonnet-4-6`
- `models.chat` (DB plane, the silent override) → `anthropic:claude-sonnet-4-6`
- `~/.gbrain/config.json` `chat_model` still `minimax:MiniMax-M3` (file plane, untouched)

## Why this config
- `models.chat` is what autopilot's `reconfigureGatewayWithEngine` reads (cli.ts:2162, called once at startup). If left as M3 → recipe has no `chat` touchpoint → `isAvailable('chat')=false` → silent no-op.
- Sonnet 4-6: $3 in / $15 out per M. Pricing entry already in `model-pricing.ts` (commit 57beb779).
- Original Kimi bridge (deployed 2026-06-14, see `findings/2026-06-14-gbrain-kimi-anthropic-bridge`) was the workaround for the broken `sk-ant-v0...` placeholder key. Kimi quota now exhausted → bridge dead.

## What's still broken
- Every shell has only the `sk-ant-v0...` PLACEHOLDER (12 chars). `~/.openclaw/.env`, `~/.openclaw/gateway.systemd.env`, every project `.env` — all sanitized placeholders.
- The real Anthropic key is in 1Password vault `OPENCLAW` but `op read` returns 403 (service-account token "invalid credentials provided"). Token expires 2026-11-05 — should be valid; the auth path itself is wedged.
- Manual `gbrain enrich --yes --force` after the config switch: `[chat(anthropic:claude-sonnet-4-6)] invalid x-api-key`. Projected-cost line ($0.0356) shows in audit log but the call actually errored.

## What's needed to unblock
- Either a working Anthropic API key sourced into the shell + cron wrapper, or a quota refresh on the Kimi key, or a different vendor key (OpenAI / Gemini / ZAI).
- The cron wrapper `/root/scripts/gbrain-autopilot-cron.sh` still forces `ANTHROPIC_BASE_URL=api.kimi.com/coding/v1` + `ANTHROPIC_API_KEY=*** ` + `GBRAIN_CHAT_MODEL=anthropic:kimi-for-coding`. Even after config flip, the daemon restarted by cron will pick those env vars up and try Kimi (quota-exhausted) before any DB config gets a look-in.

## Open question
- Should we update the cron wrapper to remove the Kimi overrides and rely solely on DB config? Pros: cleaner mental model. Cons: without a working Anthropic key, daemon calls fail every cycle and we burn the chat reservation budget on errors.

## Working tree
Clean. No code changes shipped. Debug stderr patch in `enrich.ts` was added to surface errors, then reverted.
