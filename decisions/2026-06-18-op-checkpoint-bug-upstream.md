---
type: 'decision'
title: 'Filed upstream issue'
date: '2026-06-18T01:25:00.000Z'
status: 'shipped'
made_by: 'max'
project: 'gbrain'
related:
  - 'decisions/2026-06-18-gbrain-cross-linker-recurring'
  - 'decisions/2026-06-18-propose-takes-pr-submitted'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T01:25:52.265Z'
source_kind: 'mcp:put_page'
tags:
  - 'bug'
  - 'gbrain'
  - 'op-checkpoint'
  - 'schema-v119'
  - 'upstream-issue'
  - 'v0.42.51'
created: '2026-06-18T01:25:00.000Z'
---

# Op-checkpoint CHECK constraint bug — filed upstream #2263

## What
Issue #2263 filed on garrytan/gbrain: <https://github.com/garrytan/gbrain/issues/2263>

**Title:** extract --by-mention checkpoint write fails CHECK constraint (non-fatal, links still inserted)

**Label:** bug

## The bug (verified locally)

Every `gbrain extract links --by-mention --source db` run logs:

```
[op-checkpoint] write failed (extract-by-mention, e68c168d): new row for relation "op_checkpoints" violates check constraint "op_checkpoints_completed_keys_array"
```

- **Non-fatal:** links still insert, run completes successfully (202/222 created on our brain)
- **Resumability lost:** a killed mid-run extract re-scans every page from scratch because no checkpoint row lands in `op_checkpoints`
- **Noisy logs:** would mask any real checkpoint failure if one occurred

## Reproduction (verified locally on our brain)

```bash
bun /root/.bun/bin/gbrain.real extract links --by-mention --source db
# [extract.by_mention.scan] 222/222 (100%) done ✓
# Mentions: created 202 links from 222 pages ✓
# [op-checkpoint] write failed (extract-by-mention, e68c168d): new row ... ✗
# SELECT FROM op_checkpoints WHERE fingerprint = 'e68c168d' → 0 rows
```

## What I've ruled out

- **Constraint itself is correct:** direct `INSERT ... '["a","b"]'::jsonb` works (INSERT 0 1). Empty arrays accepted. Plain objects + JSON strings correctly rejected.
- **Schema version 119** (the migration that added the constraint) is the latest; doctor reports `schema_version: Version 119 (latest: 119)`.
- **Source-side code (`src/core/op-checkpoint.ts:175-194`):** looks correct — `JSON.stringify(sorted)` then `$3::jsonb` cast.

## Where I suspect the bug is

`src/commands/extract.ts:1838` calls `recordCompleted(engine, ckptKey, [...completed])` with a `Set<string>`. The chain `recordCompleted → durableWrite → engine.executeRawDirect → conn.unsafe(sql, params)` should pass the JSON string as a parameterized text value, with the `::jsonb` cast converting server-side. Code reads correct but the constraint fires.

Three possibilities I flagged in the issue:
1. **postgres.js parameter coercion** — `JSON.stringify(sorted)` as a JS string might get double-encoded if postgres.js infers JSON type from string content
2. **appendCompleted path** — uses `'[]'::jsonb` literal, shouldn't violate, but worth checking if there's a state-leak between paths
3. **Migration drift** — v119's CHECK applied to a DB with pre-v119 non-array rows; INSERT path somehow tripping over legacy state

## Suggested fixes (in the issue)

1. Add a debug log of exact `$3` value pre-INSERT
2. Verify against a fresh DB (no pre-v119 rows)
3. Either relax the constraint to accept empty string OR wrap INSERT in a try-cast to surface the exact failing value

## Process notes

- Filed via `gh issue create` from local checkout
- Issue body is structured (Environment / Reproduction / Verified / Origin / Impact / Suggested next steps) so it's actionable for whoever picks it up
- Did NOT block on it — extract runs are still useful, just non-resumable
- Decision captured here so future agents can find the upstream tracking link

## Related

- PR #2262 (propose-takes deadline fix) — also recently filed
- Cron `29d975be-…` (weekly linker pipeline) — uses `extract links --by-mention` in step 4; tolerates the bug for now
- Cross-linker state file `/root/.openclaw/workspace/memory/.state/gbrain-cross-linker.json` — our LLM-driven cross-linker is the workaround for any orphan resolution gaps until the bug is fixed
