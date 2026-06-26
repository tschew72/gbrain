---
type: 'decision'
title: 'gbrain Update — Preserve Fleet Customizations'
date: '2026-06-26T00:00:00.000Z'
scope: 'gbrain'
status: 'active'
captured_at: '2026-06-26T07:10:19.694Z'
captured_via: 'capture-cli'
ingested_via: 'put_page'
ingested_at: '2026-06-26T07:11:06.346Z'
source_kind: 'put_page'
created: '2026-06-26T00:00:00.000Z'
---

# gbrain Update — Preserve Fleet Customizations

## Rule (Vince 2026-06-26)
**Whenever updating gbrain (rebase, pull, cherry-pick), all fleet customizations must be preserved UNLESS the latest version has already implemented the same change.**

This is non-negotiable.

## Procedure (verified 2026-06-26, v0.42.44 → v0.42.53.0)
1. **Pre-flight:** `git fetch origin master` + `git log --oneline HEAD..origin/master`
2. **Diff local vs upstream:** Identify which files local uncommitted changes touch vs which files upstream commits touch. Compute intersection.
3. **For each intersection file:** compare line-by-line. If upstream implements the SAME fix/feature (even with a different approach), **take upstream**. If upstream is unrelated, **keep local**.
4. **Stash → Rebase → Pop:**
   ```bash
   git stash push -m "local-uncommitted-$(date +%Y-%m-%d)-pre-rebase" --include-untracked
   git rebase origin/master
   git stash pop
   ```
5. **Resolve conflicts** per the rule. In rebase context: `--ours` = upstream (being rebased onto), `--theirs` = local commits being replayed.
6. **Verify:** `bun run build` + `bin/gbrain doctor` + `pm2 restart gbrain-jobs-supervisor` (must use `--interpreter bun`).
7. **Commit** the rebased state with explicit notes on what was preserved vs taken from upstream.

## Fleet Customizations (preserved as of 2026-06-26)
- `src/core/ai/recipes/minimax.ts` — MiniMax-M3 + kimi-for-coding pricing (commit fa28c13d)
- `src/core/doctor-categories.ts` — 7 fleet checks: embed_staleness, entity_link_coverage, takes_count, timeline_coverage, dangling_aliases, pack_upgrade_available, type_proliferation
- `docs/integrations/embedding-providers.md` — fleet embedding provider docs
- `src/commands/tools-json.ts`, `src/mcp/{dispatch,tool-defs}.ts` — fleet MCP/CLI surface
- `test/{ai/recipe-minimax,doctor-categories,mcp-tool-{aliases,defs},op-checkpoint}.test.ts` — fleet test coverage

## Reference Rebase (2026-06-26)
Commit: `ab9dab60` on branch `runtime/fleet-customizations` — HEAD on top of v0.42.53.0.

**Conflict:** `src/core/op-checkpoint.ts` — both local and upstream #2339 fixed the same jsonb double-encode bug with different approaches. Took upstream ($3::text::jsonb) because it has parity test + AST-lite CI guard (`scripts/check-jsonb-params.mjs`) + CLAUDE.md docs. Local workaround discarded.

**Auto-merged:** `src/core/doctor-categories.ts` — local adds 7 fleet checks, upstream adds 1 different check (autopilot_fanout_concurrency). Both preserved via union merge.

## Related
- MEMORY.md "gbrain Update — Preserve Fleet Customizations (Vince 2026-06-26)"
- HEARTBEAT.md 2026-06-26 entry
