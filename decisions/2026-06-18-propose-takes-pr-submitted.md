---
type: 'decision'
title: 'Propose-takes deadline PR submitted to upstream gbrain (#2262)'
date: '2026-06-18T01:00:00.000Z'
status: 'shipped'
made_by: 'max'
project: 'gbrain'
related:
  - 'decisions/2026-06-13-promptdome-pause'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T01:08:49.131Z'
source_kind: 'mcp:put_page'
tags:
  - 'deadline'
  - 'dream-cycle'
  - 'gbrain'
  - 'sigterm'
  - 'upstream-pr'
  - 'v0.42.20'
created: '2026-06-18T01:00:00.000Z'
---

# Propose-takes deadline PR #2262 — submitted

## What
PR #2262 submitted to garrytan/gbrain: <https://github.com/garrytan/gbrain/pull/2262>

**Title:** fix(cycle): bound propose_takes phase with per-call + phase-level deadlines

**Branch:** `tschew72:fix/propose-takes-deadline-and-timeout` (forked from garrytan/gbrain master at v0.42.51.0)

**Diff:** 53 insertions, 1 deletion in `src/core/cycle/propose-takes.ts`

## The fix (three layered bounds)

1. **`EXTRACTOR_CALL_TIMEOUT_MS = 90_000`** — per-call `AbortSignal.timeout` on the extractor. A stalled provider socket aborts the single call, page is logged as a warning, phase continues. Mirrors `withDefaultTimeout` in `core/ai/gateway.ts`.
2. **`PHASE_DEADLINE_MS = 30 * 60 * 1000`** — phase wall-clock deadline checked inside the page loop (O(1) per page, `Date.now() - phaseStartMs`). Phase returns `deadline_hit: true` instead of being killed by an outer wrapper.
3. **`pageLimit` default 100 → 30** — 30 pages × ~30s = 15 min fits inside both the 30-min phase deadline and a $5 budget. Callers needing more can opt in via `opts.pageLimit`.

`ProposeTakesResult` gains an optional `deadline_hit?: boolean` field. Older consumers ignore it.

## Why it matters

Surfaced via the `propose_takes aborted SIGTERM` pattern that hit the nightly dream cycle from 2026-06-15 onward (post-v0.42.20.0 ship, when extraction prompts moved to production). Before the fix, the phase was hard-killed at the 600s cron wrapper boundary with zero proposals preserved. After: the phase returns a partial result with whatever proposals it managed to insert before the deadline — making dream runs **resumable** and the lost proposals **observable** in the dream log.

## Process notes

- **Fork created:** `tschew72/gbrain` (we had READ on garrytan/gbrain only)
- **Patch saved before revert:** `/root/.gbrain/patches/minimax-recipe-doc-fix.patch` — the minimax.ts doc fix is local-only (not appropriate for upstream; it's specific to our env)
- **Local gbrain state preserved:** still on `fix/propose-takes-deadline-and-timeout` branch, with `minimax.ts` modification back in the working tree
- **HEARTBEAT updated** with the PR link

## Test status

- [x] Live test on 219-page brain: phase completed cleanly in ~4 min with `pageLimit=30`
- [x] No `propose_takes aborted SIGTERM` in dream.log since 2026-06-18
- [x] Brain score 83/100 preserved
- [ ] Upstream CI confirmation on larger hermetic test set — flagged in PR test plan

## Lesson (Vince 2026-06-18)

When a recurring SIGTERM pattern is observable in logs, the fix is almost never "raise the timeout." It's almost always "stop pretending the call will complete in a bounded time and surface the partial result." The three-layer structure (per-call, phase-level, capacity default) means each bound can fail independently without cascading — and the caller gets a structured `deadline_hit` signal instead of a process kill.

This is the same architectural pattern as the M2.7→M3 migration's "executive + advisor" pairing: small focused guards at multiple layers, each doing one thing, that compose to a system that degrades gracefully instead of failing catastrophically.
