---
type: 'decision'
title: '2026 06 14 Gbrain Pack Upgrade Defer'
date: '2026-06-14T00:00:00.000Z'
status: 'active'
context: 'gbrain doctor fires pack_upgrade_available WARN despite brain already on gbrain-base-v2'
related:
  - 'findings/2026-06-14-gbrain-pack-upgrade-false-positive'
decided_by: 'V!₦©€ (Vince)'
decided_in: null
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-14T04:55:57.095Z'
source_kind: 'mcp:put_page'
created: '2026-06-14T00:00:00.000Z'
---

# Gbrain pack upgrade — DEFER to upstream fix (2026-06-14)

## Decision

**Do not run the gbrain `unify-types` Minion remediation for the `pack_upgrade_available` doctor warning. Do not apply a local source patch to `checkPackUpgradeAvailable`. Wait for upstream gbrain to ship the fix.**

## Context

The `gbrain doctor` `pack_upgrade_available` check fires a `[WARN]` recommending `gbrain onboard --auto` to apply the `unify-types` migration (`gbrain-base` → `gbrain-base-v2`).

Investigation confirmed the warning is a **false positive caused by a v0.42 onboarding-check bug**:

- `~/.gbrain/config.json` already has `schema_pack: "gbrain-base-v2"` (mtime 2026-06-14 07:34)
- `gbrain schema active` confirms v2 is active (`Source: home-config`)
- `gbrain schema stats` reports 72 pages typed against the v2 taxonomy (entity 40, decision 11, note 10, etc.)
- DB `config` table is empty
- The doctor check `checkPackUpgradeAvailable` in `src/core/onboard/checks.ts:384` calls `loadActivePack({ cfg: null, remote: false, dbConfig })`. With `cfg: null` and DB empty, the resolver falls through every tier to the hardcoded default `gbrain-base` and reports THAT as the active pack. The check does not read `~/.gbrain/config.json`.

The proposed local patch is one line: `cfg: loadConfig()` instead of `cfg: null`. But this is gbrain source code, not Evvo code — the right path is upstream, not a local fork.

## Why we're not running the migration anyway

Even though the unify-types migration would likely be a no-op (data is already in v2 shape), the job is marked `protected: true` in source and writes to every page (retypes + `frontmatter.legacy_type` stamps + 72h soft-delete TTL on alias/link pages). Wasted write transaction on 72 pages for no benefit, with the side effect of making the v0.42 bug fire a "no successor" message after — i.e. the warning would just come back in a different form when the bug is fixed.

## Action items

- [ ] Track gbrain upstream release notes for a fix to `checkPackUpgradeAvailable` (v0.43+)
- [ ] When the upstream fix lands, re-verify with `gbrain doctor` and `gbrain onboard --check --explain`
- [ ] If we hit a real v0.42 bug-blocker before the upstream fix ships, escalate to a local patch as a last resort (NOT proactive)
- [ ] Do not auto-apply any gbrain `onboard --auto` remediation without explicit Vince sign-off

## Cross-references

- Technical root cause: `findings/2026-06-14-gbrain-pack-upgrade-false-positive`
- Doctor invocation: `gbrain.real doctor` (PM2 service: gbrain-jobs-supervisor)
- Active schema pack confirmation commands: `gbrain schema active`, `gbrain schema stats`
