---
type: 'decision'
title: '2026 06 15 Discord Agent Monitor Removed'
date: '2026-06-15T00:00:00.000Z'
actor: 'vince'
status: 'completed'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-14T22:42:34.514Z'
source_kind: 'mcp:put_page'
tags:
  - 'agent-monitor'
  - 'cleanup'
  - 'discord'
  - 'openclaw'
  - 'systemd'
created: '2026-06-15T00:00:00.000Z'
---

# OpenClaw Discord Agent Monitor — Removed

## Decision
Fully removed `openclaw-agent-monitor.service` (user systemd) and all artifacts.

## What was removed
- Systemd unit: `/root/.config/systemd/user/openclaw-agent-monitor.service`
- Script: `/root/scripts/openclaw-discord-agent-monitor.mjs`
- State file: `/root/.openclaw/agent-monitor/state.json` (and the now-empty parent dir)
- Test: `/root/scripts/tests/openclaw-agent-monitor.test.mjs`
- Process PID 1261 (had been running 3d 8h)

## Why
- The monitor's `getDefaultDiscordTarget()` picks the FIRST channel binding in `openclaw.json` if `OPENCLAW_AGENT_MONITOR_TARGET` env var is unset
- Result: session context warnings for the #agentmail channel (1476899514764759144) were being posted into #ivv-website-new (1485815933074411581) — wrong target, low value
- Vince: "Remove this service" → no replacement planned; full wind-down

## Key code locations (for reference if re-implementing)
- `buildSessionBudgetNotice()` — line 115 in original script
- `findOversizedDiscordSessions()` — line 90
- Warn threshold env var: `OPENCLAW_AGENT_MONITOR_SESSION_TOKEN_WARN` (default 55k, was overridden to 170k)
- Notice throttle: `OPENCLAW_AGENT_MONITOR_SESSION_NOTICE_MS` (default 5 min)

## Outstanding consequence
- #agentmail session `676a12ac-1dcb-4485-807c-73e10ec23901` was at 170,841/200,000 tokens (85%) when last warning fired
- No longer monitored — will auto-compact on next turn, or needs manual `sessions.patch` reset
