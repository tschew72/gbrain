---
type: 'concept'
title: 'GBrain cleanup sequence and residual warnings'
date: '2026-06-21T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-20T18:08:58.570Z'
source_kind: 'mcp:put_page'
tags:
  - 'cleanup'
  - 'gbrain'
  - 'maintenance'
  - 'ops'
created: '2026-06-21T00:00:00.000Z'
---

- Incremental `gbrain.real sync --source default` did not clear `sync_freshness` when the source was already up to date.
- `gbrain.real sync --source default --full --no-pull` forced a full import from `/root/.gbrain/checkout` and refreshed the source state.
- After the full sync, `gbrain.real extract --stale` cleared the stale edge backlog.
- The cleanup sequence that worked was: full sync first, then `extract --stale`.
- `gbrain doctor` now reports `sync_freshness: ok` and `links_extraction_lag: ok`.
- The simple `gbrain health` summary can still lag and show `Stale pages: 1` even after `extract --stale` reports current, so `doctor` is the better signal for stale-edge cleanup.
- Residual warnings after cleanup were structural, not stale-edge related: resolver/skill docs health, entity/timeline coverage, orphan ratio, pack upgrade availability, and the `home_dir_in_worktree` warning.
