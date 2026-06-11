---
type: decision
title: Gbrain Postgres Migration 2026 06 05
domain: architecture
status: active
created: '2026-06-05T00:00:00.000Z'
related:
  - nextjs-app-vs-src-app-trap
last-updated: '2026-06-05T00:00:00.000Z'
---

# GBrain PGLite → Postgres Migration (2026-06-05)

## Decision
Vince picked **option 3** in #learning: migrate GBrain from PGLite to Postgres/Supabase. Skipped the interim "crons instead of autopilot" path and went straight to the real fix.

## Why
- PGLite is **single-writer** — autopilot + gbrain-mcp + hooks can't coexist.
- Recurring WASM corruption after every process kill (morning wipe lasted 10h, then corrupted again).
- Lock-wrappers were a band-aid, not a solution.

## What changed
- **Engine:** PGLite → Postgres (pgvector/pgvector:pg16 container, 127.0.0.1:5442)
- **Database URL:** `postgresql://gbrain:gbrain_evvo_2026_pwd@127.0.0.1:5442/gbrain`
- **Concurrent processes NOW possible:**
  - `gbrain-mcp` (port 3050, 105MB)
  - `gbrain-autopilot` (5-min cycle, 4MB)
  - Real-time hooks (before_prompt_build, agent_end) — no longer blocked
- **Scripts updated:**
  - `gbrain-mcp-start.sh` exports `GBRAIN_DATABASE_URL`
  - `autopilot-run.sh` exports `GBRAIN_DATABASE_URL`
- **PGLite fallback:** `/root/.gbrain/brain.pglite.corrupt.2026-06-04-20-04` kept (don't delete for 7d)

## What I did NOT do
- Full 02-KNOWLEDGE re-ingest (2399 files). Will trigger via `gbrain sync --repo` once expansion API key is fixed (separate issue).
- Decommission the corrupt PGLite brain — quarantine 7d then delete.
- File the path-2 cron fallback (option 2 superseded).

## Lesson
PGLite is great for single-writer embedded use, but the moment concurrency matters (autopilot + MCP + hooks), Postgres is the right call. Don't paper over PGLite limitations with lock-wrappers — escalate to migration.

## WI reference
`03-EXECUTION/gbrain/WI-GBRAIN-001-supabase-migration-2026-06-05.md`
