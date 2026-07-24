---
type: concept
title: Weekly PMO Chase Pass cron fix
created: '2026-07-24T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-24T02:42:52.103Z'
source_kind: 'mcp:put_page'
tags:
  - cron
  - gbrain
  - openclaw
  - pm
  - teams
---

# Weekly PMO Chase Pass cron fix

- Cron job: `b78520fb-5a5f-41b2-b1cc-e8f53fac3c39`
- Old failure mode: `cron: job execution timed out (last phase: tool-execution-started)` after repeated ~5 minute stalls.
- Fix: replace the heavy isolated agent prompt with a short prompt that runs `/root/.openclaw/workspace-agents/pm/scripts/weekly_pmo_chase_pass.py`.
- New script path: `/root/.openclaw/workspace-agents/pm/scripts/weekly_pmo_chase_pass.py`
- Script behavior: reads `projects/registry.md`, `projects/risks.md`, and `projects/commercial.md`; builds a Teams chase summary; optionally checks the latest Kailash payment-terms mail; posts to BU Cybersecurity Management via Graph.
- Cron timeout: reduced to `180s` for the agent turn because the heavy reasoning is now in a direct script, not the model prompt.
- Verification: `python3 -m py_compile` passed and `python3 weekly_pmo_chase_pass.py --dry-run` produced a valid HTML chase summary without posting.
