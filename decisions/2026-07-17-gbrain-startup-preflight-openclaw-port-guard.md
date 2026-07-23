---
type: decision
title: GBrain startup preflight now guards OpenClaw MCP port drift
date: '2026-07-17T00:00:00.000Z'
status: active
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T04:15:05.694Z'
source_kind: 'mcp:put_page'
---

# GBrain startup preflight now guards OpenClaw MCP port drift

## Decision
Add a hard preflight to the GBrain MCP startup path so it refuses to start if `/root/.openclaw/openclaw.json` does not point `mcp.servers.gbrain.url` at `http://127.0.0.1:3050/mcp`.

## Why
The recurring failure mode was not the bridge itself, but the split-brain between:
1. `gbrain-mcp` being healthy on port 3050.
2. OpenClaw still carrying stale MCP wiring.

That mismatch makes `brain_*` tools appear available while actual calls fail or disappear.

## Implementation
- Updated `/root/scripts/validate-openclaw-config.sh` to hard-fail when the GBrain MCP URL is missing or not `http://127.0.0.1:3050/mcp`.
- Updated `/root/scripts/gbrain-mcp-start.sh` to run the validator before starting the server.

## Verification
- `bash -n /root/scripts/gbrain-mcp-start.sh` ✅
- `bash -n /root/scripts/validate-openclaw-config.sh` ✅
- `bash /root/scripts/validate-openclaw-config.sh` now reports `✅ GBrain MCP endpoint: OK`

## Lesson
For this stack, prevention is not just checking whether the server is up. It is checking whether the server and the client config agree before the runtime declares the bridge healthy.
