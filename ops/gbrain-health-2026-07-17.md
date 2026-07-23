---
type: note
title: GBrain Health Check 2026-07-17
date: '2026-07-17T00:00:00.000Z'
status: active
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T00:53:49.207Z'
source_kind: 'mcp:put_page'
---

# GBrain Health Check 2026-07-17

## Verified State
- `gbrain-mcp` is online in PM2.
- `gbrain-jobs-supervisor` is online in PM2.
- `http://127.0.0.1:3050/health` returns `{"status":"ok","version":"0.42.57.0","engine":"postgres"}`.
- `/root/.openclaw/openclaw.json` already points the GBrain MCP server at `http://127.0.0.1:3050/mcp`.

## Conclusion
The earlier 3051 vs 3050 port drift is not present now. There is no live GBrain bridge defect to fix at this moment.

## Follow-up Lesson
If brain_* tools disappear again, check both planes:
1. PM2 service health and port 3050 listener.
2. OpenClaw MCP config at `/root/.openclaw/openclaw.json`.

Mismatch between those two is the recurring failure mode.
