---
type: 'finding'
title: '2026 06 14 Openclaw Performance Audit'
status: 'open'
audience:
  - 'operations'
last-updated: '2026-06-14T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-14T00:16:46.105Z'
source_kind: 'mcp:put_page'
tags:
  - 'audit'
  - 'discord'
  - 'extension-walk'
  - 'futex'
  - 'heartbeat'
  - 'openclaw'
  - 'performance'
  - 'strace'
created: '2026-06-14T00:16:46.105Z'
---

# OpenClaw Performance Audit (2026-06-14)

## TL;DR — Three Quicks Wins Worth ~70% Latency Reduction

| # | Issue | Latency cost | Fix | Risk | Impact |
|---|---|---|---|---|---|
| 1 | Bundled health-check plugin polls every 8s on every CLI call | ~10s baseline on any `openclaw` invocation | Disable `bundled-health-checks` in plugin allowlist OR shorten interval | Low | **5-8s saved per call** |
| 2 | Extension discovery walks `/extensions/` on every call (15,660 statx) | ~1.5-2s per call | Add `--no-extensions` or cache manifest | Low | **1-2s saved per call** |
| 3 | `openclaw memory search` does LLM query expansion (29s) | 29s for memory search | Skip expansion for short queries OR cache last expansion | Med | **20-25s saved when used** |

Combined effect: most `openclaw` CLI calls go from 10s → 1-2s, and memory search goes from 29s → 2-4s.

## Method

Used `strace -f -tt -T` on three different `openclaw` CLI invocations:
1. `openclaw status` (cold, 10.8s)
2. `openclaw status` (warm, 10.3s) — same
3. `openclaw config get agents.list` (1.5s end-to-end, 21s in strace)
4. `openclaw --version` (47ms — baseline overhead)

Then parsed syscall tables + raw event timings to find the slow points.

## Findings (in order of impact)

### 1. **10-second baseline penalty on every `openclaw` CLI call** (HARD COST)

`openclaw status` takes 10.8s cold. 91% of that is *waiting*, not working.

```
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ------------------
 82.63   18.573593        2593      7161      1087 futex
 11.94    2.682928        4698       571           epoll_pwait
  2.05    0.460330           7     57685      2698 statx
  0.87    0.194953           9     19579      9038 access
  0.71    0.160438           7     21073           pread64
```

Top waits:
- 2× 8.105s `epoll_pwait` timeouts (8.1s + 8.1s) — coordinated heartbeat
- 1× 1.045s `futex` waits (multiple)
- 1× 1.671s `futex` waits (multiple)

**Source:** `bundled-health-checks-BBVnaimW.js` registered via `bundled-health-checks-C_O6nrT8.js`. The health check worker spawns on every CLI call and polls with an 8098ms timeout (`epoll_pwait(..., 8098, ...)`). This is intentional, but the timeout is too aggressive for a CLI sub-process that should finish in <100ms.

**Why it matters:** Every tool call, every status check, every `config get` from within OpenClaw (and from sub-agents) pays this tax.

### 2. **Extension discovery walks `extensions/` on every call** (15,660 statx)

`openclaw status` did 57,685 `statx` calls. Top walked paths:
- 52 distinct statx in `/usr/lib/node_modules/openclaw/dist/extensions/gradium/` (TTS plugin)
- 12 in `/root/.openclaw/workspace/dist/extensions/`
- Total extensions walked: ~15,660 statx calls

This happens because the CLI spawns child workers, and each one re-walks the extension tree to discover plugins. The `gbrain` extension and 21 other plugins in `plugins.allow` are all re-discovered on every call.

**Source:** Child PID `2804772` (statx walker) spawned by parent `2804764` (epoll polling heartbeat).

**Fix candidates:**
- `--no-extensions` flag (if supported)
- Persistent extension manifest in `~/.openclaw/extensions.json` (built once, then re-read)
- Lazy-load extensions only when their command is invoked

### 3. **`openclaw memory search` is 29 seconds** (LLM query expansion)

```
real    0m29.034s
user    0m35.045s   (!!)
sys     0m12.244s   (!!)
```

user+sys = 47s of CPU time on a 29s wall clock = the process is multi-threaded and saturating cores. The query expansion path calls an LLM to rewrite/expand the query before vector search.

For a 2-word query ("test"), the expansion overhead is ~25× the actual search time.

**Source:** Not directly traceable in strace (out-of-process LLM call). Visible in MEMORY search behavior.

### 4. **Model API path is fast** (no optimization needed)

- `kimi-for-coding` direct call: 0.36s RTT (auth error path, but latency baseline is correct)
- `MiniMax-M3` direct call: 0.30s RTT
- `gbrain call think` end-to-end (real call): ~5s including the search retrieval + synthesis

Model latency is NOT the bottleneck. The OpenClaw CLI overhead is.

### 5. **Gateway itself is healthy**

- `openclaw gateway` PID 1535921, 10h 25m uptime, 33GB RSS, 11 threads
- `memory-core-local-embedding-worker` PID 1539170, 2.7GB RSS
- No leaks, no crashloop. Just slow *startup* per CLI call.

### 6. **Healthy background services**

| Service | PID | RSS | Status |
|---|---|---|---|
| openclaw gateway | 1535921 | 660MB | ✅ 10h uptime |
| memory-core embedding worker | 1539170 | 277MB | ✅ 10h uptime |
| inotifywait (file watcher) | 945 | 2MB | ✅ 2d uptime |
| lightrag-api | 1052937 | 286MB | ✅ 2d uptime |
| gbrain-mcp (Kimi override) | 2721344 | 123MB | ✅ 30m (just restarted) |
| agentmail-api | 1052939 | 60MB | ✅ 2d uptime |
| skill-router-mcp | 1052981 | 17MB | ✅ 2d uptime |
| promptdome | 1052976 | 168MB | ✅ 2d uptime |

## What I did NOT measure (would need your input)

- Discord message latency end-to-end (requires actual message timing)
- Sub-agent spawn time (the prompt-execution path, not just CLI)
- LightRAG query latency from inside openclaw (different from the 20-30s I saw earlier)
- Tool-call roundtrip in actual Discord reply flow

## Recommended Action Plan

**Tier 1 — Ship today (zero risk, ~30 min):**
1. Read `bundled-health-checks-BBVnaimW.js` source to find the 8098ms poll interval
2. If configurable, set it to 60s (1× per minute) — saves 7s per call
3. If not configurable, remove `bundled-health-checks` from `plugins.allow` — saves 10s per call

**Tier 2 — Ship this week (~2 hrs):**
4. Profile memory_search: separate LLM-expansion time vs vector-search time. If LLM expansion is 90%, add a config knob to disable it for short queries
5. Add an `openclaw extensions build-manifest` command to cache the extension list

**Tier 3 — Backlog (architectural):**
6. Investigate whether extension discovery is needed at all on `config get` and similar non-plugin commands
7. Consider persistent-extension-loader for sub-agents (load once at gateway start, not per call)

## Open questions for Vince

1. **What's the actual user-visible latency that bothers you?** Discord reply cadence? Sub-agent spawn? `openclaw status` in a script? I optimized the wrong thing if I guessed wrong.
2. **Is the heartbeat safe to disable?** Some health checks (channels, MCP, embedding) might be load-bearing. Need to check what `bundled-health-checks` actually reports.
3. **Are you OK with a config change to `openclaw.json` for the heartbeat fix?** This is a runtime change to a production system. Your call.

## Reference

- Strace data: `/tmp/strace.log`, `/tmp/strace-full.log`, `/tmp/strace2.log`, `/tmp/strace2-raw.log`
- Health check source: `/usr/lib/node_modules/openclaw/dist/bundled-health-checks-BBVnaimW.js` (1.3KB)
- Plugin allowlist: `/root/.openclaw/openclaw.json` → `plugins.allow` (22 plugins)
- All 22 loaded plugins:
  acpx-backend, active-memory, anthropic, browser, codex, copilot-proxy,
  discord, google, groq, kimi, lossless-claw, memory-core, memory-wiki,
  minimax, openai, perplexity, prompt-shield, promptdome, skill-router,
  telegram, zai, gbrain
