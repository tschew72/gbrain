---
type: 'decision'
title: 'Local changes preservation strategy (Vince 2026-06-18)'
date: '2026-06-18T01:40:00.000Z'
status: 'shipped'
made_by: 'max'
project: 'gbrain'
related:
  - 'decisions/2026-06-18-propose-takes-pr-submitted'
  - 'findings/2026-06-14-gbrain-pack-upgrade-false-positive'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T01:39:34.783Z'
source_kind: 'mcp:put_page'
tags:
  - 'branch-strategy'
  - 'gbrain'
  - 'patches'
  - 'preservation'
  - 'upgrade'
  - 'v0.42.51'
created: '2026-06-18T01:40:00.000Z'
---

# Local changes preservation strategy

## Decision (Vince 2026-06-18)

Adopt a 4-layer strategy so the brain's local modifications survive every gbrain upgrade:

1. **Master = clean upstream** (`origin/master` ff-only)
2. **One `fix/<name>` branch per upstream-PRable concern** — single-file, fleet-agnostic
3. **One `runtime/fleet-customizations` branch** — what the brain actually runs (master + fleet-specific commits). NOT for upstream PR.
4. **One-script upgrade ritual** (`/root/scripts/gbrain-upgrade.sh`) that does the full upgrade + preservation in one command

## Why now

We've been carrying local modifications with inconsistent preservation:
- `skills/RESOLVER.mini.md` and `skills/mnemon/` were untracked files inside `/root/gbrain/skills/` — silent-clobber risk on every `git pull`
- `src/core/ai/recipes/minimax.ts` had an env-specific docstring diff — only useful locally, not at runtime
- `src/core/model-pricing.ts` had MiniMax-M3 + Kimi pricing entries — uncommitted, would have been lost on next `git pull`/`reset`

The v0.42.51 upgrade revealed the gap. PR #2262 + issue #2263 took care of upstream-trackable work; this strategy takes care of fleet-specific work.

## The branch layout

```
master                                  ← origin/master (ff-only)
  ↑
  ├── fix/propose-takes-deadline-and-timeout  ← pushed to fork, PR #2262
  │                                            (1 file, 53+/1-)
  │                                            NOT fleet-specific — open for upstream
  │
  └── runtime/fleet-customizations      ← what the brain actually runs
       (master + fix/propose-takes-deadline-and-timeout + fleet pricing)
       Pushed to fork as backup.
```

**Conventions:**
- One `fix/*` branch per concern. Single-file ideally. Keep diffs PR-friendly.
- `runtime/fleet-customizations` is rebased on top of master after every upgrade.
- Fleet-specific changes (e.g. pricing for our deployed models) commit directly to `runtime/fleet-customizations`.
- The brain's checkout at `/root/gbrain/` always points to `runtime/fleet-customizations`. All PM2 gbrain services resolve through `/root/.bun/bin/gbrain.real` → `/root/gbrain/src/cli.ts`, so the branch switch is live after `pm2 restart gbrain-jobs-supervisor`.

## Why not just one branch

Earlier pattern: everything on `master`, deal with merge conflicts on each upgrade. Two problems:
1. **PRs go to upstream contaminated with fleet-specific stuff** — bad hygiene, review noise
2. **Upstream-only fixes (like the propose-takes deadline) get tangled with fleet stuff** — harder to upstream, easier to lose

Three branches = clearer ownership, easier to upstream the right things, easier to drop local mods when upstream catches up.

## The upgrade script

`/root/scripts/gbrain-upgrade.sh` — does the whole upgrade in one command:

```
bash /root/scripts/gbrain-upgrade.sh              # upgrade to latest origin/master
bash /root/scripts/gbrain-upgrade.sh <SHA-or-tag> # upgrade to specific version
```

Steps (in order):
1. Pre-flight: git state + remotes + services
2. Stash working tree (auto, idempotent)
3. Checkout master, ff-only pull from origin (or reset to target SHA/tag)
4. Push updated master to fork so PR branches rebase cleanly
5. Checkout runtime/fleet-customizations, rebase onto new master
6. Rebase all local fix/* branches and push to fork
7. Re-apply any patches from /root/.gbrain/patches/ (warn on conflict, never auto-resolve)
8. Restore stash (if any)
9. Restart gbrain-jobs-supervisor + any other gbrain PM2 services
10. Verify: version, branch state, doctor, pricing table presence

What it does NOT do:
- Resolve merge conflicts (exits non-zero, tells you what to fix)
- Touch /root/.openclaw/workspace/skills/ (those are workspace, not gbrain checkout)
- Touch the brain DB (version-agnostic at this scale)

## Patches directory convention

`/root/.gbrain/patches/`
- Active patches go at the root (auto-applied by upgrade script)
- Already-committed patches get moved to `_archive/<date>-<reason>.patch`
- `README.md` documents what's archived + why (historical context)

**Prefer commits over patches.** Git tracks them properly. Patches are for the rare case where a mod can't be committed cleanly (e.g. deeply env-specific, ephemeral).

## What got done this turn

| Action | Detail |
|---|---|
| Moved `skills/RESOLVER.mini.md` → workspace | `/root/.openclaw/workspace/skills/local-resolver/SKILL.md` |
| Moved `skills/mnemon/SKILL.md` → workspace | `/root/.openclaw/workspace/skills/mnemon/SKILL.md` (was duplicate of clawhub v0.1.2) |
| Reverted `minimax.ts` doc patch | Env-specific docstring, not needed at runtime |
| Committed pricing change | `runtime/fleet-customizations` commit `57beb779`: add MiniMax-M3 + kimi-for-coding to CANONICAL_PRICING |
| Built upgrade script | `/root/scripts/gbrain-upgrade.sh`, smoke-tested with `9bf96db8` (no-op upgrade, all clean) |
| Pushed to fork | Both `fix/propose-takes-deadline-and-timeout` and `runtime/fleet-customizations` pushed to `tschew72/gbrain` |

## Lessons (Vince 2026-06-18)

1. **Env-specific files belong in workspace, not in upstream checkouts.** Skills in `/root/gbrain/skills/` were silent-clobber risk on every `git pull`. Always move them out.
2. **Single-purpose branches are PR-friendly.** `fix/propose-takes-deadline-and-timeout` keeps the upstream PR minimal (1 file). Fleet-specific stuff stays on `runtime/fleet-customizations`.
3. **Prefer commits over patches.** Git tracks them. The script auto-rebases committed changes; patches need re-application.
4. **Backup branches to fork.** `runtime/fleet-customizations` pushed to `tschew72/gbrain` so disk-die doesn't lose fleet work.
5. **Smoke-test upgrade scripts with no-op runs.** `bash gbrain-upgrade.sh <current-SHA>` proves the script doesn't break things on a normal day, not just on upgrade days.

## Related

- PR #2262 (upstream propose-takes deadline fix) — `decisions/2026-06-18-propose-takes-pr-submitted`
- Issue #2263 (upstream op-checkpoint CHECK constraint bug) — `decisions/2026-06-18-op-checkpoint-bug-upstream`
- Pre-existing pattern: `decisions/2026-06-14-gbrain-pack-upgrade-defer` (prefer upstream fixes over local patches)
- v0.42.51 upgrade walkthrough: HEARTBEAT 2026-06-18
