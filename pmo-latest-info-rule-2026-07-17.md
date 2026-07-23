---
type: concept
title: PMO latest-info rule
created_at: '2026-07-17T00:00:00.000Z'
updated_at: '2026-07-17T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T06:33:32.113Z'
source_kind: 'mcp:put_page'
---

## Rule
The PMO post is file-backed: it reads `projects/registry.md`, `projects/active/*.md`, and `projects/risks.md` only.

## Implication
- It does **not** read GBrain.
- It does **not** read live Discord/Teams chatter directly.
- It does **not** include `projects/commercial.md` because commercial items are intentionally excluded from PMO delivery reporting.

## Operational takeaway
If the tracker files are stale or if the latest decision exists only in chat/memory, the PMO report will lag until the tracker files are updated first.
