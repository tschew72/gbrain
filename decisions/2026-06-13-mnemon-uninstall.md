---
type: 'decision-log'
title: '2026 06 13 Mnemon Uninstall'
date: '2026-06-13T00:00:00.000Z'
domain: 'operations'
status: 'active'
related:
  - 'decisions/2026-06-13-massive-wind-down'
audience:
  - 'operations'
  - 'vince'
last-updated: '2026-06-13T21:50+08:00'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-13T13:46:51.295Z'
source_kind: 'mcp:put_page'
tags:
  - 'infrastructure'
  - 'mnemon'
  - 'retirement'
  - 'Sat Jun 13 2026 08:00:00 GMT+0800 (Singapore Standard Time)'
  - 'uninstall'
  - 'wind-down'
created: '2026-06-13T00:00:00.000Z'
---

# mnemon Full Uninstall — 2026-06-13 21:50 SGT

Vince issued "uninstall mnemon" at 21:38 SGT and confirmed option 4 (full uninstall + disable cron + kill MCP server) at 21:38 SGT. Executed in 11 steps over 12 minutes. The work was harder than expected — `mnemon setup --eject` lied about what it removed, and a hidden systemd layer auto-respawned the MCP server.

## Why this is its own page (vs. just appending to the wind-down page)

The mnemon uninstall is structurally different from the cron culls and the app wind-downs. It's:

1. **A pure retirement, not a wind-down** — no spec, no timeline, no customer-facing component. Just gone.
2. **A new lesson surface** — the systemd-respawn + `setup --eject` lying are operational patterns worth their own note.
3. **Reversible-but-costly** — the backups at `/tmp/mnemon-*` + `/root/.openclaw/workspace/sysadmin/mnemon-uninstall-2026-06-13/` make a re-install a 5-min job, but it's no longer `apt install` simple. Worth keeping the recipe.

## What was uninstalled (full list)

### Binaries (3)
- `/usr/local/bin/mnemon` (symlink, was Go binary)
- `/root/go/bin/mnemon` (10MB Go binary, was the actual binary)
- `/root/.linuxbrew/Cellar/mnemon/0.1.3/` (Homebrew install — discovered mid-execution; not visible in `mnemon setup --eject` output or in PM2)
- `/root/.linuxbrew/Taps/mnemon-dev/` (Homebrew tap)

### OpenClaw integration (4)
- `/root/.openclaw/skills/mnemon/` (root skill, removed by `setup --eject`)
- `/root/.openclaw/workspace-agents/jennifer/skills/mnemon/SKILL.md` (jennifer's copy — `setup --eject` doesn't touch agent-specific skills)
- `/root/.openclaw/extensions/mnemon/` (plugin — `setup --eject` claimed to remove but did not; manual rm with backup)
- `/root/.openclaw/hooks/mnemon-prime/` (hook — removed by `setup --eject`)

### openclaw.json (3 spots edited)
- `plugins.entries.mnemon` block (~10 lines) — removed
- `load.paths` entry — removed
- Top-level `plugins.entries` keys list (line 1673) — pruned "mnemon"

### Systemd (2 services)
- `mnemon-mcp.service` — stopped, disabled, unit file removed, backup at `/root/.openclaw/workspace/sysadmin/mnemon-uninstall-2026-06-13/`
- `mnemon-api.service` — same
- `systemctl daemon-reload` after unit file removal

### Cron (1 entry)
- `30 6 * * * /bin/bash /root/.openclaw/workspace/sysadmin/mnemon-post-brew-upgrade.sh` — line 93 of crontab, removed via `crontab -l | sed -e ... | crontab -`
- The script itself (`/root/.openclaw/workspace/sysadmin/mnemon-post-brew-upgrade.sh`) also removed

### MCP server :9623
- `/root/projects/lightrag/mnemon_mcp_server.py` — NOT deleted (it's a LightRAG-owned Python file, just exposes the mnemon interface)
- pid 3814154 (original) killed
- pid 1518960 (auto-respawned after gateway restart) killed
- 2 systemd services were the respawn mechanism — once stopped + disabled + unit files removed, no respawn

### Data
- 12 mnemon stores quarantined to `/root/.mnemon/_quarantine_2026-06-13/data/<store>/mnemon.db` (223M total)
- 3 root-level 0-byte marker `.db` files quarantined (per the 80KB-exception in MEMORY.md)
- `/root/.mnemon/prompt/{guide.md,skill.md}` quarantined
- `/root/.mnemon/active` quarantined
- CGA app data (consulting.db, pending_approvals.jsonl, tool_audit.jsonl) — **preserved untouched**

### Documentation updates
- `/root/.openclaw/workspace/MEMORY.md` — Plugins list pruned; historical note added for retirement
- `/root/.openclaw/workspace/HEARTBEAT.md` — Service Health row updated; pending-decisions list updated
- `/root/.openclaw/workspace-agents/jennifer/AGENTS.md` — 4 live mnemon refs removed, 1 historical note added

## Backups (for re-install if needed)

- `/tmp/mnemon-plugin-backup-2026-06-13/` — full plugin extension (4 files, 3.2K)
- `/tmp/mnemon-jennifer-skill-backup-2026-06-13.md` — jennifer's SKILL.md (5909 bytes)
- `/tmp/mnemon-pre-uninstall-inventory.txt` — 22-line snapshot of all mnemon files pre-quarantine
- `/root/.openclaw/workspace/sysadmin/mnemon-uninstall-2026-06-13/` — 2 systemd unit files
- `/tmp/crontab-backup-2026-06-13.txt` — full 105-line crontab snapshot

## Lessons worth logging

### Lesson 1: `mnemon setup --eject --target openclaw --yes` is unreliable

It claimed to remove the extension, skill, and hook. In practice it only removed the skill and hook. The plugin extension directory was still there, and `openclaw.json` still had 3 references.

**Why this matters:** If I'd trusted the `setup --eject` output and walked away, the next OpenClaw restart would have re-loaded the plugin from the still-present extension directory, silently re-activating mnemon.

**Fix pattern for the future:** Never trust a setup tool's success report. Always verify with `ls -la` on the claimed-removed paths + `grep -n "<name>" openclaw.json` + `openclaw gateway restart` + re-grep.

### Lesson 2: Always check `systemctl list-units --all | grep -i <name>` for respawn mechanisms

The MCP server auto-respawned after the gateway restart. I assumed it was a one-off `python3 mnemon_mcp_server.py` invocation (PPID=1 confirms it's not under PM2), but the systemd timer at `mnemon-mcp.service` was the real respawn mechanism.

**Why this matters:** For any "agent" service with a process that should die, the kill is not the action — the respawn mechanism is the action. The kill is just a symptom treatment.

**Fix pattern for the future:** `systemctl list-units --all | grep -i <name>` should be a first step, not a last resort.

### Lesson 3: Homebrew + Go installs can coexist for the same binary

The system had both `/usr/local/bin/mnemon` (Go) AND `/root/.linuxbrew/bin/mnemon` (Homebrew) for the same binary. Different version (Go was the development checkout, Homebrew was 0.1.3 release). Different update cadences. Different uninstall paths.

**Why this matters:** If I had assumed the Go install was the only one and moved on, the Homebrew install would have remained. `PATH` would have still resolved to mnemon after the Go removal.

**Fix pattern for the future:** Before removing a binary, check all 3 common install locations: `which -a <name>`, plus `ls /usr/local/bin/ /usr/bin/ /root/.linuxbrew/bin/` for the name.

### Lesson 4: The "4 stores" count in HEARTBEAT was stale

The actual count was 12 stores in `/root/.mnemon/data/<store>/mnemon.db` + 3 root-level 0-byte markers. HEARTBEAT said "4 stores, all <1% capacity" — the 4 was a snapshot from when mnemon was first set up, before the per-agent workspace-agents stores were added.

**Why this matters:** The MEMORY.md "80KB-exception" rule for safe-to-clean was for the 0-byte root markers. The 12 real stores are much larger (consulting was 40MB). Different cleanup protocols.

**Fix pattern for the future:** Counts in operational dashboards (HEARTBEAT) should be derived live (`ls -la /root/.mnemon/data/*/mnemon.db | wc -l`), not hand-written from memory.

### Lesson 5: Naming collisions are subtle

`/root/.mnemon/data/consulting.db` (CGA app's flat-file DB) vs `/root/.mnemon/data/consulting/mnemon.db` (a legitimate mnemon store named "consulting"). The naming overlap is coincidence, not design. My first quarantine loop excluded "consulting" to be safe around the CGA file, which accidentally also excluded the legitimate store.

**Why this matters:** The 40MB consulting store is now safely quarantined, but a less-careful operator might have deleted it thinking it was the CGA exception.

**Fix pattern for the future:** When names collide, distinguish by extension (`consulting.db` = CGA, `consulting/mnemon.db` = store) or by parent dir layout, not by the directory name alone.

## Re-install recipe (5 min if needed)

If Vince ever wants mnemon back, the path is:

```bash
# 1. Reinstall binary (Homebrew is faster)
brew tap mnemon-dev/tap
brew install mnemon
# or: go install github.com/mnemon-dev/mnemon@latest

# 2. Reinstall OpenClaw integration
mnemon setup --target openclaw --yes

# 3. Restore backups if anything's missing
cp /tmp/mnemon-plugin-backup-2026-06-13/* /root/.openclaw/extensions/mnemon/
cp /tmp/mnemon-jennifer-skill-backup-2026-06-13.md /root/.openclaw/workspace-agents/jennifer/skills/mnemon/SKILL.md

# 4. Restore systemd services
cp /root/.openclaw/workspace/sysadmin/mnemon-uninstall-2026-06-13/mnemon-*.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now mnemon-mcp.service mnemon-api.service

# 5. Restore data from quarantine
mv /root/.mnemon/_quarantine_2026-06-13/data/* /root/.mnemon/data/ 2>/dev/null
mv /root/.mnemon/_quarantine_2026-06-13/*.db /root/.mnemon/ 2>/dev/null

# 6. Restore daily cron
(crontab -l 2>/dev/null; echo "30 6 * * * /bin/bash /root/.openclaw/workspace/sysadmin/mnemon-post-brew-upgrade.sh >> /var/log/mnemon-post-brew-upgrade.log 2>&1") | crontab -

# 7. Update jennifer/AGENTS.md to re-add mnemon triggers
# 8. Restart OpenClaw gateway
```

## Quarantine hard-delete schedule

- **2026-06-20 (T+7):** All files in `/root/.mnemon/_quarantine_2026-06-13/` hard-deleted.
- **Re-archive exception:** If Vince signals "keep mnemon" by then, the data is restored (see recipe above).
- **Default behavior:** cron auto-purge runs at T+7, no further action needed.

## Open follow-ups

- [ ] Confirm quarantine hard-delete date with Vince before 2026-06-20
- [ ] Watch for any service that was indirectly consuming mnemon data (Kai's daily curation, `data/workspace-agents/mnemon.db` consumer) — first 7-day period
- [ ] Update the global Auto-Heal rule (MEMORY.md "Vince 2026-04-06") to include the 4 lessons above, especially "check respawn mechanism, not just process state"

## Related
- `decisions/2026-06-13-massive-wind-down` — full timeline of the 2026-06-13 wind-down
- `memory/2026-06-13.md` — daily log
- `HEARTBEAT.md` — service health row updated
- `MEMORY.md` — CGA exception + Plugins list
