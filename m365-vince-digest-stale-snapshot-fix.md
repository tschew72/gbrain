---
type: concept
title: M365 Vince digest stale snapshot fix
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-20T04:15:57.045Z'
source_kind: 'mcp:put_page'
tags:
  - bugfix
  - digest
  - m365
  - stale-state
  - teams
---

# M365 Vince digest stale snapshot fix

## Problem
The #vince-digest pipeline could keep showing the previous run's Teams snapshot when the helper failed, timed out, or was skipped, because the downstream runner reused `/root/.openclaw/workspace/memory/.state/m365-teams-latest.json` if it was still on disk.

## Fix
- Delete the stale Teams output file before each helper run in `scripts/m365_ingest_runner.py`.
- Only accept the snapshot if `scanned_at` is fresh for the current run.
- Write `/root/scripts/m365-teams-delta.py` output atomically via temp file + `os.replace`.

## Outcome
This prevents a failed or aborted run from silently reusing the prior run's Teams payload.
