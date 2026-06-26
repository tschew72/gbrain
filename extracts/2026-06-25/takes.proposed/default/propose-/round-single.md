---
type: 'extract_receipt'
title: 'takes.proposed — single — default'
kind: 'takes.proposed'
round: 'single'
run_id: 'propose-20260625190017-1d63024c'
cost_usd: 0
source_id: 'default'
total_rows: 2
enriched_at: '2026-06-25T19:00:49.673Z'
enriched_by: 'cli:enrich'
extracted_at: '2026-06-25T19:00:37.834Z'
dream_generated: true
ingested_via: 'put_page'
ingested_at: '2026-06-25T19:00:55.089Z'
source_kind: 'put_page'
created: '2026-06-25T19:00:55.089Z'
---

## Overview

`takes.proposed` is the single-round extraction step in the GBrain pipeline that proposes new "takes" (insight candidates) from recently ingested pages. It runs as part of the overnight dream cycle under the `propose-` run family. [Source: extracts/2026-06-13/takes.proposed/default/propose-/round-single]

## Run History

| Date | Pages | Cached | Proposed | Run ID | Extracted At |
|------|-------|--------|----------|--------|--------------|
| 2026-06-13 | 67 | 13 | 9 | `propose-20260613231549-6e362deb` | 2026-06-13T23:16:44.277Z |
| 2026-06-14 | 70 | 19 | 1 | `propose-20260614024601-5fb1eac3` | 2026-06-14T02:47:39.840Z |
| 2026-06-25 | 30 | 12 | 2 | `propose-20260625190017-1d63024c` | 2026-06-25T19:00:37.834Z |

## Reliability History

### SIGTERM Issues (June 15–17, 2026)

The `propose_takes` phase historically suffered from **SIGTERM kills** during nightly dream runs starting June 15, 2026. The root cause was zero timeout protection on LLM calls: up to 100 pages each called `gatewayChat()` with no per-call timeout and no phase deadline, causing the cron wrapper's `timeout 600` (10 min) to abort the process. [Source: decisions/2026-06-18-propose-takes-timeout-fix]

### Fix Applied (v0.42.20.0)

Three defense layers added to `propose-takes.ts`:

- **Per-LLM-call timeout:** `AbortSignal.timeout(90_000)` on each `gatewayChat()` call
- **Phase deadline:** `PHASE_DEADLINE_MS = 30 * 60 * 1000` (30 min), checked per page iteration; returns partial result with `deadline_hit: true` instead of hard kill
- **Page limit reduced:** default 100 → 30 pages, fitting ~15 min budget

The `ProposeTakesResult` type gained `deadline_hit?: boolean` for observability. [Source: decisions/2026-06-18-propose-takes-timeout-fix]

### Cron Wrapper Update

- `timeout 600` → `timeout 1800`
- `payload.timeoutSeconds: 900` → `1800`
- Run name updated to document version [Source: decisions/2026-06-18-propose-takes-timeout-fix]

### Verification

Manual trigger 2026-06-18 08:02 SGT completed in **354s (~5.9 min)** with `status: ok`, 30 pages, 0 proposals, 0 aborts, 0 deadline hits. All defense layers engaged cleanly. [Source: decisions/2026-06-18-propose-takes-timeout-fix]

## Deferred Enhancement

Model swap to `claude-haiku-4-5` for `propose_takes` extraction is on hold pending confirmation that the timeout fix is solid across full runs. Haiku offers 5-10x cost/speed improvement for extraction workloads. [Source: decisions/2026-06-18-propose-takes-timeout-fix]
