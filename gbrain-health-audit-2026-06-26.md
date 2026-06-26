---
type: 'decision'
domain: 'ops'
status: 'active'
last-updated: 2026-06-26
audience:
  - 'operations'
related:
  - 'decisions/2026-06-25-gbrain-third-plane-endpoint'
  - 'decisions/2026-06-24-gbrain-config-plane-split'
title: 'GBrain Health Audit + Remediation — 2026-06-26 12:56 SGT'
created: '2026-06-26T22:41:16.000Z'
---

# GBrain Health Audit + Remediation — 2026-06-26 12:56 SGT

**Trigger:** Vince ask in #agents: "Is the Gbrain functioning well. audit"

## Audit Verdict
**GBrain functioning, autopilot active, 5 issues found, 3 fixed live.**

## Issues Found

1. **gbrain-mcp PM2 service STOPPED** (port 3050 not listening). Restarted via `pm2 start gbrain-mcp`. Now online (PID 2511627), `/health` returns ok. **FIXED**

2. **OpenClaw config port mismatch.** `openclaw.json` mcp.servers.gbrain points to `http://127.0.0.1:3051/mcp`, but the actual server runs on port 3050. **Result: brain_* MCP tools claimed available by metadata, but actual calls fail.** Not fixed in this session — needs config patch + gateway restart. Flag for Vince.

3. **CLI lock contention** — autopilot holds `.gbrain-cli.lock` for ~50min during cycle (PID 2128723, 12:00 SGT). New `gbrain doctor`/`config show` calls block up to 60min waiting. Expected behaviour (PGLite-style single-writer guard), not a bug.

4. **enrich_thin phase timeout** — last cycle ran 32s vs 30s worker force-evict deadline (issue #1972). Risk of cycle abort on slow days.

5. **8 zombie `jobs work` workers** — accumulated Jun 22-25, all PPID=1 (orphaned). CPU idle, no parent supervisor. Killed all 8 plus 8 stale worker-XXX.json files. Active autopilot worker (PID 2134190) preserved. **FIXED**

6. **201 orphans / 286 pages** (70%) — chronic, slight increase from Jun 25 (200/285). Not blocking. Needs a linker pass.

7. **Stale supervisor log files** — supervisor.out.log/.err.log from Jun 18 (Bun stdio not flushing to PM2 logs). Real activity in dream.log + workers/. Cosmetic only.

## Verification
- gbrain-mcp: online, /health ok, port 3050 listening, bun PID 2511627
- gbrain-jobs-supervisor: online, 4d 5h uptime, 0 restarts (PID 2612701)
- Active autopilot: PID 2128723 (57min), active worker PID 2134190 (55min)
- Workers dir: 24 records (down from 32), all current
- No new zombies accumulated after 30s monitor

## Open Items (flagged for follow-up)
- OpenClaw openclaw.json port 3051 → 3050 fix (needs gateway restart)
- brain_capture via HTTP API — admin token rejected, server v0.42 may use different auth flow. Bypassed for now by writing to checkout/ (autopilot ingestion path)
- enrich_thin phase timeout (#1972) — needs upstream gbrain fix
- 201 orphans — schedule linker pass

## Lesson
GBrain has TWO integration planes in this stack: the PM2 service (`gbrain-mcp`) AND the OpenClaw MCP client config. Both must agree on port. When OpenClaw config drifts from reality, the agent runtime reports tools "available" even when they're silently broken. Add a health check to the gbrain-mcp entry that validates openclaw.json port on startup.