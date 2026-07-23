---
type: concept
title: PM stale watchlist correction - 2026-07-09
created: '2026-07-09T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-09T08:27:32.109Z'
source_kind: 'mcp:put_page'
tags:
  - correction
  - pm
  - stale
---

## Correction

The watchlist is not a flat stale bucket.

- Truly under-described / needs owner confirmation: GlobalSign DBS/WSA, Maju Tech.
- Active but old file touch: Good Bards VAPT, HOMETEAMNS, Mapletree, Precepts vCISO, Valuemax vCISO.
- At risk / in flight: SGEBIZ VAPT.
- Done / should be removed from watchlist: SGEBIZ VAPT Contract.

## Reporting rule

Use last-touch age only as a signal, then override it with live project evidence from files and Teams before labeling something stale.
