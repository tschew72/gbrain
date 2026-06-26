---
type: 'observation'
title: '2026 06 18 M3 Overloaded'
date: '2026-06-18T00:00:00.000Z'
model: 'MiniMax-M3'
status: 'active'
related:
  - 'decisions/2026-06-18-main-agent-sonnet-4-6'
provider: 'minimax'
error_classes:
  - 'overloaded_error 503'
  - 'api_error 408 timeout'
  - 'rate_limit 429'
cascading_fallback:
  - 'kimi-code 429 usage_limit'
  - 'zai/glm-5.1 429 overloaded'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T02:11:17.521Z'
source_kind: 'mcp:put_page'
tags:
  - 'fallback-chain'
  - 'm3'
  - 'minimax'
  - 'model-routing'
  - 'overload'
  - 'rate-limit'
created: '2026-06-18T00:00:00.000Z'
---

# 2026-06-18 — MiniMax M3 overload observed

## Symptoms (10:00–10:10 SGT)
- HTTP 503 `overloaded_error`: "server is busy, please retry later" (multiple sub-agent runs)
- HTTP 408 timeout: `{"type":"api_error","message":"unknown error, 999 (1000)"}`
- HTTP 429 (M3): "DEGRADED function cannot be invoked" (per external reports)
- Cascading failures into fallback chain: kimi-code 429 "reached your usage limit for this billing cycle", zai/glm-5.1 429 "service may be temporarily overloaded"
- Full chain exhausted: M3 → kimi → glm-5.1 — all failed

## External context (web search 2026-06-18)
- M3 went live 2026-06-01; widespread user complaints since ~06-15
- Playground queues: 125–498 requests; "DEGRADED function cannot be invoked" HTTP 400
- M3 has 1M-token context → TPM caps trigger fast for tool-heavy runs with 14K+ token agent preambles

## Internal impact
- 9/22 fleet agents on M3 (main, sales, ux, devops, marketing, jennifer, amelia, ops, glm-5)
- Cron storm at 9:00 SGT already caused GLM-5.1 429s (HEARTBEAT.md 2026-06-14) — M3 overload compounds this
- Main session swap to Sonnet 4.6 applied 2026-06-18 10:08 SGT (see sibling decision)

## Recommended actions (pending Vince)
- Add kimi-code to main agent fallback chain (currently `[M3, M2.7]`, all MiniMax)
- Re-evaluate remaining 8 M3-primary agents
- Consider staggering M3 cron firings
- Long-cache flag for M3 if gateway supports it
- Monitor M3 health at platform.minimax.io for recovery signal

## Verification artifacts
- `/tmp/openclaw/openclaw-2026-06-18.log` — search for `model_fallback_decision` events
- All main-session events in 10:00–10:10 window show M3 as `requestedProvider` and `requestedModel`
