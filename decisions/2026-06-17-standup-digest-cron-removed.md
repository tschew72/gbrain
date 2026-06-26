---
type: 'decision'
title: 'Standup Digest Cron Removed — 2026-06-17'
status: 'applied'
effective_date: '2026-06-17T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-17T12:24:41.805Z'
source_kind: 'mcp:put_page'
tags:
  - 'cron'
  - 'decommissioning'
  - 'dispatcher'
  - 'm365'
created: '2026-06-17T12:24:41.805Z'
---

# Standup Digest Cron Removed — 2026-06-17 20:24 SGT

## Decision
Removed the two system crontab lines that ran Vince's PM standup digest (00:30 + 01:30 SGT daily):

```
30 0 * * * /root/projects/max-workspace/m365_digest/run_vince_standup.sh
30 1 * * * /root/projects/max-workspace/m365_digest/run_vince_standup.sh
```

Also removed the section comment `# Vince PM Standup Digests` directly above them.

## Why
- The standup token in `m365_digest.db` (Vince's `user_id=VINCE` row) was returning HTTP 401 on Graph API calls (`/me/mailFolders/Inbox/messages`)
- Token had been silently expired for some time — both daily 00:30 + 01:30 runs were no-op'ing in the log
- The 30-min digest (`/root/scripts/m365-teams-delta.py` via OpenClaw cron `37d925d9-...`) is the path that actually works for Vince, using `/root/.outlook-mcp/credentials.json` (separate token store)
- Phuong's digest now works through the new multi-user dispatcher at `/root/projects/max-workspace/m365_digest/run_daily_digest.sh` (separate from the standup path)

## Scope of removal
- ✅ Removed: 2 lines + 1 comment in `/etc/crontab` (system crontab via `crontab -`)
- ✅ Backup saved: `/tmp/crontab.backup-2026-06-17` (full crontab, 9831 bytes)
- ❌ NOT removed: `/root/projects/max-workspace/m365_digest/run_vince_standup.sh` script (left intact in case Vince changes his mind)
- ❌ NOT removed: `m365_digest.db` row for VINCE (token store left alone)
- ❌ NOT removed: `dispatcher.py --vince` mode in `dispatcher.py` (left intact; just no cron triggers it now)

## Backup
`/tmp/crontab.backup-2026-06-17` — to restore:
```bash
crontab /tmp/crontab.backup-2026-06-17
```

## Context
- Triggered from #automation-solutions on 2026-06-17 20:23 SGT after Max flagged the 401 issue + offered the fix
- Vince chose "remove the standup digest cron" over re-auth or migrate-to-30min-token
- This is one of three options offered: (A) re-capture token, (B) migrate to /root/.outlook-mcp/credentials.json, (C) remove cron entirely

## Related
- See `2026-06-17-phuong-m365-onboarding` for the full Phuong capture flow that revealed the 401
- The 30-min cron `37d925d9-...` (OpenClaw `m365-teams-30min-ingest`) continues unaffected
- Phuong's new daily cron entry was NOT added in this decision — separate discussion
