---
type: concept
title: Headroom Codex routing decision
created: '2026-07-14T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-14T11:53:00.106Z'
source_kind: 'mcp:put_page'
---

- Headroom proxy is healthy on `http://127.0.0.1:8788`.
- Port `8787` is already in use by `/root/.openclaw/workspace/sysadmin/webhook_listener.py`, so it should not be reused.
- The user approved proceeding with the Headroom setup for Codex routing.
- The practical next step is to launch Codex via `headroom wrap codex` or point an OpenAI-compatible client at `http://127.0.0.1:8788/v1`.
