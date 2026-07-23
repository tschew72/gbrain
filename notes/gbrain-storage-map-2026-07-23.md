---
type: note
title: GBrain storage map
source: 'discord:#2ndbrain'
created: '2026-07-23T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:18:26.628Z'
source_kind: 'mcp:put_page'
---

Verified storage layout for GBrain:

- On-disk checkout/source tree: `/root/.gbrain/checkout`
- Source status: registered as `default`
- Database of record: Postgres at `127.0.0.1:5442/gbrain`
- Legacy/fallback brain data still present: `/root/.gbrain/brain.pglite.corrupt.2026-06-04-20-04`

Interpretation:
- Markdown pages and synced artifacts live under the checkout tree.
- The DB is the source of truth for the brain engine.
- The checkout is the filesystem working directory used by dream/sync phases, not the canonical truth store.
