---
type: lesson
title: 2026 06 15 Restriction Scope Don't Touch Interpretation
created: '2026-06-15T00:00:00.000Z'
audience:
  - max
  - agents
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-14T23:00:35.305Z'
source_kind: 'mcp:put_page'
tags:
  - gbrain
  - max-directive
  - orchestration
  - vince-shorthand
---

# Restriction Scope — "Don't Touch X" Interpretation

## What happened
2026-06-15 06:58 SGT, #ivv-website-new. During the host cleanup sprint that
removed `openclaw-agent-monitor.service`, I over-read Vince's "don't touch gbrain
MCP" as a total restriction. I held off on `gbrain__put_page` captures even
though Layer 2 (LLM-driven capture) is the normal Max discretion path.

Vince's correction: "don't touch means not to delete" — i.e. the **destructive** read.

## Rule going forward

| Class | Tools | OK without re-confirm |
|---|---|---|
| Read-only | `whoami`, `query`, `search`, `get_*`, `list_*`, `find_*`, `recall`, `think`, `list_skills`, `get_skill`, `get_health`, `get_stats` | ✅ yes |
| Append / capture (Layer 2) | `put_page` (new lesson/decision/finding/note), `add_link`, `add_tag`, `add_timeline_entry`, `log_ingest`, `extract_facts`, `submit_agent` (low-stakes), `put_raw_data` | ✅ yes |
| Mutate own state | `put_page` (overwrite existing), `sources_add`, `submit_job` (low-cost jobs), `replay_job`, `retry_job`, `resume_job`, `cancel_job`, `pause_job` | ✅ yes (still log it) |
| Destructive / irreversible | `delete_page`, `forget_fact`, `remove_link`, `remove_tag`, `sources_remove`, `revert_version`, `schema_apply_mutations`, `run_onboard` (auto/auto-with-prompt), `run_skillopt`, `reload_schema_pack` | ❌ ask first |
| Write to irreversible external surfaces | any tool whose side effect reaches a customer / production / billing surface | ❌ ask first (Vince: "When in doubt, ask before acting externally") |

## Heuristic
- "Don't touch" / "hands off" / "leave it" → destructive read, not total read
- "Stop" / "pause" / "kill" → total halt of activity on that surface
- "Don't post" / "don't send" → outbound only, inbound reads still OK
- "Don't share" → confidentiality scope, not capability scope

## Cross-references
- `architecture/gbrain-capture-chain-design` — Layer 2 = Max discretion, the read/write posture this lesson protects
- `decisions/2026-06-15-discord-agent-monitor-removed` — the trigger event
- `AGENTS.md` "PromptDome BLOCK = Hard Stop" — same shape, hard rule for a specific destructive read
- `SOUL.md` "When in doubt, ask before acting externally" — escalation path when class is unclear
