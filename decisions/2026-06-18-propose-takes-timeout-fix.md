---
type: 'decision'
title: '2026 06 18 Propose Takes Timeout Fix'
date: '2026-06-18T00:00:00.000Z'
status: 'active'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T00:10:53.152Z'
source_kind: 'mcp:put_page'
tags:
  - 'dream-cycle'
  - 'fix'
  - 'gbrain'
  - 'propose_takes'
  - 'timeouts'
  - 'v0.42.20.0'
created: '2026-06-18T00:00:00.000Z'
---

# GBrain propose_takes SIGTERM — Permanent Fix (v0.42.20.0)

## The problem

`cycle.propose_takes` consistently stalled across nightly dream runs (June 15+), getting killed by SIGTERM twice in a row at the same phase. June 13/14 completed; June 15+ all aborted.

## Root cause

`/root/gbrain/src/core/cycle/propose-takes.ts` had **zero timeout protection** on its LLM calls. The phase iterates up to 100 pages, each calls `gatewayChat()` with no per-call timeout and no overall phase deadline. The cron prompt wrapper `timeout 600` (10 min) killed the phase when the LLM calls accumulated. Same pattern as `patterns.ts` v0.23 ship state — but propose_takes was never retrofitted to that pattern.

## The fix (3 layers, all in propose-takes.ts)

1. **Per-LLM-call timeout** — `AbortSignal.timeout(90_000)` passed to `gatewayChat`. 90s is "something is wrong" territory for short extraction prompts. One bad page can't stall the phase.
2. **Phase deadline** — `private static readonly PHASE_DEADLINE_MS = 30 * 60 * 1000` checked at top of each page iteration. Phase returns partial result with `deadline_hit: true` instead of getting SIGTERM-killed.
3. **`pageLimit` default 100 → 30** — 100 pages × ~30s/call = 50 min (blows past wrapper). 30 pages × ~30s = 15 min, fits in budget + window.
4. **Plus:** `ProposeTakesResult` gained `deadline_hit?: boolean` field for observability.

## The cron update

`0f17502d-…` (GBrain Dream — Overnight Maintenance):
- Wrapper `timeout 600` → `timeout 1800`
- `payload.timeoutSeconds: 900` → `1800`
- Name updated to "GBrain Dream — Overnight Maintenance (v0.42.20.0 timeouts)"
- Prompt documents the new defense layers so future agents understand why timeouts were bumped

## Verification

Manual trigger 2026-06-18 08:02 SGT (Vince: "Can you run it now"):
- Started 08:02:57, finished 08:09:09 → **354s total (~5.9 min)**
- propose_takes: `status: ok`, `duration_ms: 353456`, 30 pages, 0 proposals (stub-prompt returns sparse), 0 aborts, 0 deadline_hit, 0 budget_exhausted
- MCP server stopped at start, restarted cleanly, HTTP 200 verified
- All three defense layers engaged cleanly; none tripped (because the LLM calls all completed in <90s)

## Lesson (Vince, 2026-06-18)

**"0 results" failures + outer SIGTERM = inner code missing timeout.**

Default assumption for any new cycle phase that does LLM calls: must have per-call `AbortSignal.timeout` + phase deadline that matches the cron wrapper budget. The `patterns.ts` shape (per-call timeout + `waitForCompletion` deadline) is the template. Apply proactively — don't wait for the SIGTERM.

## Deferred (option 3)

Model swap to `claude-haiku-4-5` for `propose_takes` extraction. Haiku is 5-10x cheaper and faster; extraction is its sweet spot. Hold until we see another full run prove the timeout fix is solid, then evaluate cost/quality tradeoff.

## New issues surfaced (separate, NOT related to SIGTERM fix)

- 46 legacy v0.31 facts blocking `extract_facts` → needs `gbrain apply-migrations --yes` once
- 151/156 pages are orphans → sparse content graph, separate cleanup task

These are content health issues, not infrastructure. Tracked separately.

## Related

- Source: `/root/gbrain/src/core/cycle/propose-takes.ts` (5 hunks patched)
- Cron: `0f17502d-b715-4786-826e-3bea82d64f5d`
- Reference pattern: `/root/gbrain/src/core/cycle/patterns.ts` (already had the right shape)
- HEARTBEAT entry: 2026-06-18 07:48 SGT (ship) + 08:09 SGT (verify)
- gbrain take: not yet added (deferred until next 3 AM run confirms stability)
