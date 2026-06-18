---
type: ops-lesson
title: 2026 06 16 M365 Cron Edit Failure Lesson
domain: ops
status: active
created: '2026-06-16T00:00:00.000Z'
applies_to:
  - m365-teams-30min-ingest
  - future-cron-prompts
  - daily-rollup-files
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-15T23:25:25.998Z'
source_kind: 'mcp:put_page'
tags:
  - cron
  - edit-tool
  - failure-pattern
  - lessons-learned
  - m365-ingest
---

# 2026-06-16: `Edit` Tool Fails on Daily Rollup Files (M365 30-min Cron)

## Symptom
M365 + Teams 30-min cron (`37d925d9-3e10-4bc6-9cb2-bb70a674011c`) failed 4 runs in 5h with the error:
```
⚠️ 📝 Edit: `in ~/.openclaw/workspace/03-EXECUTION/memory-captures/2026-06-15-m365-delta-sweep.md` failed
```

The pattern: `Edit` tool is search/replace (needs exact `oldText` match). Cron prompt told the agent to "append" to the daily sweep file. The agent's guessed `oldText` was based on the previous run's structure. When the next run's content differed (e.g., `**Trivial run.**` header on/off, blank line count, emoji), the match failed and the cron reported error.

## Affected runs (2026-06-15)
- 19:02 SGT — `temp_nyk_merge.md` (also: stale workspace-root scratch file, see rule #2)
- 20:30 SGT — `memory/2026-06-15-m365-delta.md`
- 23:10 SGT — `03-EXECUTION/memory-captures/2026-06-15-m365-delta-sweep.md`
- (1 more earlier — also Edit-fail)

## Pattern recognition
- ✅ Per-run files (`2026-06-15-1100-…`, `2026-06-15-1400-…`) succeed because each `Write` is a fresh file
- ❌ Daily rollup file (`2026-06-15-m365-delta-sweep.md`, no HHMM suffix) fails because every run does Edit-on-evolving-content

## Fix shipped 2026-06-16 07:23 SGT
1. Replaced "Output Files (per day)" section in cron prompt
2. Added explicit `Read` + `Write` pattern with bash heredoc example
3. Hard rule added to "Hard Rules" section: **DO NOT use `Edit` on daily delta or daily sweep files**
4. Recommended pattern: prefer per-run file (`{HHMM}-…`) for non-trivial runs. Daily rollup is optional.
5. New rule: no scratch files at workspace root. Use `/tmp/m365-scratch-<HHMM>.md` instead. (Worked: deleted `/root/.openclaw/workspace/temp_nyk_merge.md` at 07:24 SGT.)

## General lesson
**`Edit` tool is for surgical, in-place changes. It is the wrong tool for append-to-evolving-file.** Use `Read` + `Write` (full file rewrite) for:
- Daily/weekly log files that grow over time
- Sweep reports that accumulate per-run entries
- Any file where the agent's mental model of "the last section" is unreliable

When in doubt: per-run filename = `Write` only = reliable. Daily rollup = needs merge logic = needs `Read`+`Write` or skip entirely.

## Why this matters
Without the fix: ~1 fail per 1.5h during business hours = 5-8 noise alerts/day in #notifications, plus real signal risk if the Edit-fail happens mid-write (rare but possible). After fix: expected 0 fails on file pattern, only true model/provider rate-limits remain.

## Related
- Decision doc: `decisions/2026-06-15-m365-teams-delta-script` (Teams script delegation, June 13 fix)
- Cron job: `37d925d9-3e10-4bc6-9cb2-bb70a674011c` (m365-teams-30min-ingest)
- Earlier "All models failed" rate-limit issue (resolved via kimi fallback, 2026-06-15) was a different failure mode
