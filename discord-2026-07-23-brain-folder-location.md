---
type: concept
title: Brain folder location in repo
created_at: '2026-07-23T14:38:42.000Z'
source_uri: 'channel:1482902219228708926/message:1529860315137970459'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:39:48.470Z'
---

User asked where the brain folder is in the repo.

Verified layout:
- There is no single `brain/` directory at the repo root.
- The repo root `/root/.gbrain/checkout` is itself the brain store.
- Content is organized directly under top-level folders such as `people/`, `companies/`, `entities/`, `facts/`, `decisions/`, `events/`, `findings/`, `extracts/`, `notes/`, `memory/`, and others.

Practical answer:
- If someone expects a `brain/` folder, they should look at the repo root instead.
