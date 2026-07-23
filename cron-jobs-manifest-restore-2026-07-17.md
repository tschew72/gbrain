---
type: concept
title: Cron jobs manifest restore
created_at: '2026-07-17T00:00:00.000Z'
updated_at: '2026-07-17T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T05:38:28.334Z'
source_kind: 'mcp:put_page'
---

## Incident
`job-health-monitor.py` was crashing with `FileNotFoundError` because `/root/.openclaw/cron/jobs.json` no longer existed.

## Fix
Restored the live files from the migrated snapshots:
- `/root/.openclaw/cron/jobs.json` from `/root/.openclaw/cron/jobs.json.migrated`
- `/root/.openclaw/cron/jobs-state.json` from `/root/.openclaw/cron/jobs-state.json.migrated`

## Verification
Running `/usr/bin/python3 /root/scripts/job-health-monitor.py` returned `HEARTBEAT_OK — no new failures` after the restore.

## Note
The monitor log had been failing repeatedly until the manifest was restored at the exact path the script expects.
