---
type: 'note'
title: 'M365 backfill note (2026-06-18): local Teams cache only stores delta links and c'
captured_at: '2026-06-18T10:39:57.342Z'
captured_via: 'capture-cli'
ingested_via: 'put_page'
ingested_at: '2026-06-18T10:39:57.945Z'
source_kind: 'put_page'
created: '2026-06-18T10:39:57.945Z'
---

# M365 backfill note (2026-06-18): local Teams cache only stores delta links and c

M365 backfill note (2026-06-18): local Teams cache only stores delta links and chat last-seen state, not raw 2-week message bodies. The live GBrain source is only the default checkout; there is no registered workspace source to sync from. A true 14-day Teams/email ingest requires a live Graph replay or a purpose-built backfill export, not just the cached state files. The existing m365-teams-30min-ingest path is incremental.
