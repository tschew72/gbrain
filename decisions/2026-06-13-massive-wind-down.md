---
type: decision-log
title: 2026 06 13 Massive Wind Down
date: '2026-06-13T00:00:00.000Z'
domain: operations
status: active
related:
  - decisions/2026-06-13-promptdome-winddown-spec
audience:
  - operations
  - vince
last-updated: '2026-06-13T21:50+08:00'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-13T13:45:53.649Z'
source_kind: 'mcp:put_page'
tags:
  - cron
  - llm-cost
  - m2.7
  - mnemon
  - promptdome
  - 'Sat Jun 13 2026 08:00:00 GMT+0800 (Singapore Standard Time)'
  - strategy
  - testforge
  - wind-down
---

# Vince Wind-Down — 2026-06-13 SGT

A 6+ hour window in which Vince paused multiple layers of the Evvo stack. The scale (one app wound down, one wind-down spec launched, 71+ crons culled/converted, 6 crons converted to bare-shell, **mnemon fully uninstalled**) reveals the strategic intent: **operational consolidation + LLM cost reduction + infrastructure simplification**. This is a coordinated shift, not three unrelated events.

## Update 21:50 SGT — Round 6: mnemon fully uninstalled (option 4)

Vince issued "uninstall mnemon" at 21:38 SGT. Surfaced 4 scope options; Vince picked **option 4: full uninstall + disable cron + kill MCP server**. Executed in 11 steps, with 2 surprises caught during execution (a hidden linuxbrew install + 2 systemd services that auto-respawned the MCP process).

### What was uninstalled

| Component | Status | Path/Detail |
|---|---|---|
| Go binary | ✅ Removed | `/usr/local/bin/mnemon` symlink + `/root/go/bin/mnemon` (10MB) |
| Homebrew install | ✅ Removed | `/root/.linuxbrew/Cellar/mnemon/0.1.3/` + tap `/root/.linuxbrew/Taps/mnemon-dev/` (discovered mid-execution — not in `mnemon setup --eject` output) |
| OpenClaw skill | ✅ Removed | `/root/.openclaw/skills/mnemon/` + `/root/.openclaw/workspace-agents/jennifer/skills/mnemon/SKILL.md` |
| OpenClaw plugin | ✅ Removed | `/root/.openclaw/extensions/mnemon/` (`mnemon setup --eject` failed silently, manual removal with backup) |
| OpenClaw hook | ✅ Removed | `/root/.openclaw/hooks/mnemon-prime/` |
| Systemd services | ✅ Stopped + disabled + files removed | `mnemon-mcp.service` + `mnemon-api.service` (discovered after the gateway restart auto-respawned the MCP process — these were the actual respawn mechanism) |
| MCP server :9623 | ✅ Killed | pid 3814154 + 1518960 (auto-respawned after first kill, second time after systemd stop was final) |
| openclaw.json | ✅ Cleaned | 3 spots: `plugins.entries.mnemon` block removed, `load.paths` entry removed, top-level list at line 1673 pruned |
| Daily cron | ✅ Removed | `30 6 * * * /root/.openclaw/workspace/sysadmin/mnemon-post-brew-upgrade.sh` (line 93 of crontab) |
| Post-brew-upgrade script | ✅ Removed | `/root/.openclaw/workspace/sysadmin/mnemon-post-brew-upgrade.sh` |
| 12 mnemon data stores | 🟡 Quarantined (7-day grace) | Moved to `/root/.mnemon/_quarantine_2026-06-13/` (223M total) — hard-delete scheduled 2026-06-20 |
| 3 root-level .db markers | ✅ Quarantined | 0-byte placeholder files (`acme_corp.db`, `default.db`, `ste_mps_buoy_system.db`) per the 80KB-exception in MEMORY.md |
| prompt/ + active | ✅ Quarantined | `/root/.mnemon/prompt/{guide.md,skill.md}` + `/root/.mnemon/active` |
| jennifer/AGENTS.md | ✅ Updated | Removed 4 live mnemon refs, added 1 historical note pointing to gbrain |
| MEMORY.md | ✅ Updated | Plugins list pruned; CGA-exception note retained; cybersecurity curation pipeline flagged as broken |
| HEARTBEAT.md | ✅ Updated | Service Health row reflects retirement; pending-decisions list resolves "mnemon retirement unblock" |
| OpenClaw gateway | ✅ Restarted | To drop plugin from in-memory state after the removal |

### What was preserved (intentionally)

- **CGA app data:** `/root/.mnemon/data/consulting.db` (364K), `pending_approvals.jsonl` (19K), `tool_audit.jsonl` (52K) — all CGA's data per the MEMORY.md exception. CGA portal (3001) and api (9624) verified still serving HTTP 200. CGA SQLite tables intact.
- **Quarantine dir:** All mnemon stores kept for 7-day grace per MEMORY.md's KB-source-lifecycle policy. Hard-delete scheduled 2026-06-20.

### Backups created (in case of regret)

- `/tmp/mnemon-plugin-backup-2026-06-13/` — full plugin extension (4 files, 3.2K)
- `/tmp/mnemon-jennifer-skill-backup-2026-06-13.md` — jennifer's SKILL.md (5909 bytes)
- `/tmp/mnemon-pre-uninstall-inventory.txt` — 22-line snapshot of all mnemon files pre-quarantine
- `/root/.openclaw/workspace/sysadmin/mnemon-uninstall-2026-06-13/` — the 2 systemd unit files
- `/tmp/crontab-backup-2026-06-13.txt` — full 105-line crontab snapshot

### Surprises caught (lessons worth logging)

1. **`mnemon setup --eject --target openclaw --yes` lies.** It claimed to remove the extension dir, skill, and hook. It only removed the skill and hook. The plugin extension dir (`/root/.openclaw/extensions/mnemon/`) was still there, and `openclaw.json` still had 3 references. **Lesson: `setup --eject` is unreliable. Always verify with `ls` + `grep openclaw.json` + `openclaw gateway restart`.**

2. **The "mnemon MCP server" was actually a LightRAG-owned Python script** at `/root/projects/lightrag/mnemon_mcp_server.py`. Killing the process doesn't touch the .py. Killing is fine; don't delete the .py.

3. **Two systemd services (`mnemon-mcp.service`, `mnemon-api.service`) were the actual respawn mechanism.** They were not in PM2, not in the original `setup --eject` output, and only became visible after the gateway restart re-triggered the process. **Lesson: for "agent" services with auto-respawn, check `systemctl list-units --all | grep -i <name>` BEFORE assuming a `kill` is permanent.**

4. **linuxbrew had a separate, parallel install** of mnemon (`/root/.linuxbrew/Cellar/mnemon/0.1.3/`). The `/usr/local/bin/mnemon` symlink was to the Go install, not the Homebrew one. `brew uninstall` fails as root with "extremely dangerous" warning; manual `rm` of symlink + Cellar + Tap worked.

5. **The "4 stores" count in HEARTBEAT was stale.** Actual count was 12 stores in `/root/.mnemon/data/<store>/mnemon.db` + 3 root-level 0-byte markers. The 80KB-exception rule from MEMORY.md applied to the markers, not the real stores.

6. **The "consulting" naming collision**: my first quarantine loop had a bug that excluded the "consulting" subdir, conflating it with the CGA app's `consulting.db` file. The two are unrelated: CGA's file is `/root/.mnemon/data/consulting.db` (a flat file), the legitimate mnemon store is `/root/.mnemon/data/consulting/mnemon.db` (in a subdir). Caught it, moved the 40MB store. CGA app verified healthy after.

### What breaks as a result

- **Cybersecurity curation flow** (per MEMORY.md): "Sat 8AM SGT → #news (Alex → /pre/threat-intel/ → BullMQ → mnemon → Kai)" — already broken in practice since we removed `887efe2c` upstream in round 4. Now the sink is gone too.
- **Cybersecurity Curation (2026-04-25)** entry in MEMORY.md is now historical — the pipeline no longer functions. Weekly Autoresearch (Mon 8PM → #2ndbrain) is unaffected.
- **`mnemon` MCP server on :9623** — was bound publicly to 0.0.0.0 with no auth. Resolves an overdue P1 port audit item (HEARTBEAT had it on the list).
- **`/root/.mnemon/data/workspace-agents/mnemon.db`** — quarantined. Any workspace-agents that consumed that store's insights will be silently empty.
- **Kai's daily curation dependency** on mnemon as a sink — needs replacement (possibly Alex as weekly research briefing, per the round-4 open decision).

### Final cron footprint (21:50 SGT)

- **14 enabled, 0 disabled, 0 erroring**
- 5 command-payload (zero LLM cost)
- 9 agentTurn (LLM-justified content + research)
- 0 M2.7-highspeed pins **except** `74fde8e8` Weekly Skills Upgrade (LLM-driven research, M2.7 retained deliberately)
- 2 glm-5.1 pins (m365 work — deliberate cost-saver)
- 0 kimi pins

**Net effect of full 2026-06-13 wind-down: 71+ crons culled/converted, 1 app wound down (TestForge), 1 app in wind-down spec (PromptDome), 1 service fully uninstalled (mnemon), ~9,400+ LLM calls/month eliminated, 1 P1 port audit item resolved (9623).**

## Timeline (15:33 → 21:50 SGT)

| Time | Action | Layer | Cumulative |
|---|---|---|---|
| 15:33 | TestForge wound down | App | 1 |
| 15:39 | PromptDome wind-down spec launched | App | 2 |
| 18:31 | 2 M2.7 cron pins removed | Cron | 4 |
| 18:32 | agentmail-nightly-pipeline (8 sub-agents) removed | Cron | 5 |
| 18:39 | 12-cron batch (intel/learning/auto-upgrade/auto-test) | Cron | 17 |
| 18:43 | 11-cron batch (planning/digest/curation) | Cron | 28 |
| 18:58 | 7-cron batch (newsjack/lcm/gap research/ctm-cem/market intel) | Cron | 35 |
| 19:06 | 2 commitment scanners removed | Cron | 37 |
| 19:23 | 25 disabled crons removed | Cron | 62 |
| 19:30 | `48a0fa7d` Quarterly Archive Retention (obsolete) | Cron | 63 |
| 19:35 | 5 mechanical crons converted to command-payload | Cron | 63 (-5 LLM-cost) |
| 21:17 | 7 more crons removed (round 4) | Cron | 70 |
| 21:23 | Last erroring cron (`7c09a41a`) converted to command-payload | Cron | 70 (-1 LLM-cost) |
| 21:38-21:50 | **mnemon full uninstall** (option 4: binary + skill + plugin + 2 systemd + MCP + cron) | **Service** | 71 |

## Open Decisions Pending Vince

- **Migrate the last M2.7 pin (`74fde8e8` Weekly Skills Upgrade) to M3?** or keep as M2.7 cost-saver or convert to command-payload?
- **Update the wind-down spec for PromptDome** — Bea was working on it, status unclear
- **Replacement for Kai's removed daily threat curation** (was `887efe2c` → mnemon) — needs Alex to pick up as weekly research briefing?
- **Quarantine hard-delete date 2026-06-20** — confirm before then or extend quarantine
- **Behavioral follow-up:** Will the absence of automated commitment tracking lead to stale MEMORY.md commitments? (check in 1-2 weeks)
- **`mnemon` re-introduction cost** — if Vince wants mnemon back, the backups at `/tmp/mnemon-*` + `/root/.openclaw/workspace/sysadmin/mnemon-uninstall-2026-06-13/` make it a 5-min reinstall (after `brew tap`).

## Related
- `decisions/2026-06-13-promptdome-winddown-spec` — Bea's spec
- HEARTBEAT 2026-06-13 entries
- Memory: `memory/2026-06-13.md`
