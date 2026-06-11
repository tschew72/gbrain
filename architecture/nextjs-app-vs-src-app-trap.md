---
type: lesson
title: Nextjs App Vs Src App Trap
domain: web-architecture
status: active
created: '2026-06-05T00:00:00.000Z'
related:
  - ../MEMORY.md
  - ../../02-KNOWLEDGE/POLICIES/kb-source-lifecycle.md
last-updated: '2026-06-05T00:00:00.000Z'
---

# Next.js 16 + Duplicate `app/` Directories — The Silent-Pick Trap

## The trap
Next.js 16 silently uses the root `app/` directory when BOTH `app/` and `src/app/` exist in the same Next.js app. Build exits 0, no warning, no error. Your fix in `src/app/` is NOT shipped — the build ships `app/`.

## The AgentMail incident
- Initial MVP used `app/` (commit f1037e5, 2026-03-14).
- UI-2.0 redesign (commit ec9bde7) moved everything to `src/app/`, but the old `app/` was never deleted.
- For ~2.5 months, every commit to `src/app/` did NOT reach production.
- The dropdown fix from 18ea3d3 was the surfacing symptom.

## Detection recipe (<2 min)
1. Add a unique string to your src/app/ fix
2. Add a different unique string to the app/ file (if it exists)
3. rm -rf .next && pnpm build
4. grep the compiled chunk for your markers
5. If the src/app marker is missing and the app/ marker is present → the build is using app/, NOT src/app/

## Standing directives
- Before fixing a bug in src/app/: ls apps/*/app — if both app/ and src/app/ exist, the bug might be in app/ not src/app/. Delete the orphan first.
- After any "fix" lands: verify the fix is in the COMPILED BUNDLE, not just the source. Grep .next/ for a unique string from the fix. Applies to ALL web projects.
- Workspace root warning: multiple lockfiles cause wrong workspace-root inference. Fix: outputFileTracingRoot: path.join(__dirname, '../..') in next.config.ts. Long-term: consolidate to one lockfile per monorepo.

## Root cause
PGLite is single-writer. Replaced with Postgres 2026-06-05 to allow autopilot + gbrain-mcp + hooks to run concurrently. This page lives on the new Postgres-backed brain.
