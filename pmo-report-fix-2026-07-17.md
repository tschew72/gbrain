---
type: concept
title: PMO report fix
created_at: '2026-07-17T00:00:00.000Z'
updated_at: '2026-07-17T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T06:37:09.713Z'
source_kind: 'mcp:put_page'
---

## Root cause
The PMO HTML generator only rendered blocked / at-risk / stale sections. On-track projects were not shown at all.

The stale filter also used file mtime alone, so BeyondWealth CEM was still labeled stale even though it is an active green project.

## Fix
In `scripts/daily_pmo_status.py`:
- Added an explicit `🟢 On Track` section.
- Changed stale detection to apply only to non-green projects.
- Updated the footer text to state that stale is mtime-based for non-green projects only.

## Verification
- Added tests for on-track visibility and stale exclusion.
- Ran `pytest -q tests/test_daily_pmo_status.py` and got `2 passed`.
- Re-ran the PMO post successfully on 2026-07-17.
