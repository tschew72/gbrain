---
type: 'finding'
title: '2026 06 14 Gbrain Pack Upgrade False Positive'
date: '2026-06-14T00:00:00.000Z'
status: 'active'
context: 'gbrain doctor pack_upgrade_available WARN is a false positive for this brain'
related:
  - 'decisions/2026-06-14-gbrain-pack-upgrade-defer'
  - 'decisions/2026-06-14-gbrain-supervisor-pm2'
severity: 'low'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-14T04:55:54.255Z'
source_kind: 'mcp:put_page'
created: '2026-06-14T00:00:00.000Z'
---

# gbrain pack_upgrade_available doctor check is a false positive (v0.42 onboarding bug)

## Summary

`gbrain doctor` fires a `[WARN] pack_upgrade_available` recommending migration from `gbrain-base@1.0.0+7bd490ab` to `gbrain-base-v2@1.0.0+b9bebaa4`. The check is **wrong** — the brain is already on v2 in every measurable plane except the check itself.

## Verification (2026-06-14 12:48 SGT)

| Surface | Active pack | Source |
|---|---|---|
| `~/.gbrain/config.json` `schema_pack` field | `gbrain-base-v2` | home-config (mtime 2026-06-14 07:34) |
| `gbrain schema active` | `gbrain-base-v2@1.0.0+b9bebaa4` | `Source: home-config` |
| `gbrain schema stats` | `gbrain-base-v2@1.0.0+b9bebaa4` (15 page types, 14 link verbs) | reports against v2 |
| DB `config` table | empty (no `schema_pack` row) | postgres |
| `gbrain doctor` pack_upgrade_available message | claims `gbrain-base@1.0.0+7bd490ab` | **wrong** |

## Root cause

`src/core/onboard/checks.ts:checkPackUpgradeAvailable` (gbrain 0.42.25.0):

```ts
export async function checkPackUpgradeAvailable(engine: BrainEngine) {
  let dbConfig: string | undefined;
  try {
    dbConfig = (await engine.getConfig('schema_pack')) ?? undefined;
  } catch { /* engine.config may not exist on very old brains */ }
  const active = await loadActivePack({ cfg: null, remote: false, dbConfig })
    .catch(() => null);
  // ...
}
```

The 7-tier resolution chain in `src/core/schema-pack/registry.ts:resolveActivePackName`:

1. `perCall` — not passed → undefined
2. `env` — `GBRAIN_SCHEMA_PACK` unset → undefined
3. `perSourceDb` — not passed → undefined
4. `dbConfig` — DB plane is empty → undefined
5. `gbrainYml` — not passed → undefined
6. `homeConfig` — `cfg?.schema_pack` → `null?.schema_pack` → **undefined (the bug)**
7. **default → `gbrain-base`**

`cfg: null` means the file-plane `homeConfig` tier is never read. The check ALWAYS reports `gbrain-base` as the active pack for any brain whose active pack identity is sourced from `~/.gbrain/config.json` (which is the default per the chain's tier-6 designation).

## Secondary warning (related)

`gbrain doctor` also logs:

```
[doctor-categories] unknown check name 'pack_upgrade_available' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
```

The v0.42 check was added but never registered in `src/core/doctor-categories.ts`. So the check defaults to category `meta` and isn't aggregated into the right brain-score bucket. Cosmetic but indicates the check shipped half-finished.

## Proposed upstream fix

```diff
-  const { loadActivePack, findPackSuccessors } = await import('../schema-pack/load-active.ts');
-  let dbConfig: string | undefined;
-  try { dbConfig = (await engine.getConfig('schema_pack')) ?? undefined; } catch {}
-  const active = await loadActivePack({ cfg: null, remote: false, dbConfig })
+  const { loadConfig } = await import('../config.ts');
+  const { loadActivePack, findPackSuccessors } = await import('../schema-pack/load-active.ts');
+  let dbConfig: string | undefined;
+  try { dbConfig = (await engine.getConfig('schema_pack')) ?? undefined; } catch {}
+  const active = await loadActivePack({ cfg: loadConfig(), remote: false, dbConfig })
     .catch(() => null);
```

Plus: add `'pack_upgrade_available'` to the `META_CHECKS` (or appropriate category) set in `src/core/doctor-categories.ts`.

## Data migration status (unify-types)

`gbrain schema stats` shows 72 pages already typed against the v2 canonical taxonomy:

- entity: 40
- decision: 11
- note: 10
- decision-log: 2
- extract_receipt: 2
- finding: 2
- architecture: 1, lesson: 1, monitor: 1, operations: 1, playbook: 1

All 11 distinct types in use are in v2's declared set. So the unify-types Minion handler would be a no-op for the data — but still a write transaction that touches every page. **Not worth running.**

## Triage decision

**Defer to upstream.** See `decisions/2026-06-14-gbrain-pack-upgrade-defer`.

## Repro steps for upstream issue report

```bash
# Setup
echo '{"engine":"postgres","schema_pack":"gbrain-base-v2",...}' > ~/.gbrain/config.json
# DB config table has no schema_pack row
# Run
gbrain doctor
# Expected: doctor reports v2 as active, no pack_upgrade_available WARN
# Actual: doctor reports "Active pack: gbrain-base@1.0.0+7bd490ab" + WARN
# Cross-check
gbrain schema active    # shows gbrain-base-v2
gbrain schema stats     # reports against v2
```

## Environment

- gbrain 0.42.25.0
- Engine: postgres at `postgresql://gbrain:…@127.0.0.1:5442/gbrain`
- Files touched (for the proposed fix): `src/core/onboard/checks.ts` (1 line), `src/core/doctor-categories.ts` (1 entry)
