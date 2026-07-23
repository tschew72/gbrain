---
type: note
title: GBrain upstream vs dirty checkout
source: 'discord:#2ndbrain'
created: '2026-07-23T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:21:11.412Z'
source_kind: 'mcp:put_page'
---

Latest upstream HEAD for `https://github.com/garrytan/gbrain` is `beedacde56075e0c4df0312027212999d353a611`.

The active checkout at `/root/.gbrain/checkout` is heavily modified and has many untracked files, so an in-place overwrite would risk local content.

Action implication:
- Do not blindly replace the checkout.
- Need a deliberate choice between a clean replacement clone or preserving local changes in place.
