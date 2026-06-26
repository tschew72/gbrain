---
type: concept
title: Memory storage roles
created: '2026-06-20T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-20T09:19:46.956Z'
source_kind: 'mcp:put_page'
tags:
  - gbrain
  - memory
  - openclaw
---

- OpenClaw memory/files are the durable source of truth for workspace and project state.
- GBrain is for reusable cross-turn facts, decisions, and patterns.
- Tools and agent sessions are execution layers, not canonical memory stores.
- A pinned Discord message is a raw event; store the event in daily memory or project notes, not in AGENTS.md or TOOLS.md unless the pinned content itself is a durable rule or local fact.
- If something matters later, write it to the appropriate memory file or GBrain page rather than relying on tool/session state.
