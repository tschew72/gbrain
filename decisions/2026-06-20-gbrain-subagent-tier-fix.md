---
type: concept
title: GBrain subagent tier fix
created: '2026-06-20T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-20T13:14:20.388Z'
source_kind: 'mcp:put_page'
---

# GBrain subagent tier fix

## Decision
Keep `models.tier.subagent` on Anthropic Sonnet:
`anthropic:claude-sonnet-4-6`

## Root cause
The live DB config plane still had `models.tier.subagent = minimax:MiniMax-M3` even after the file config was edited.

## Fix
Updated the live config with the raw CLI:
```bash
/root/.bun/bin/bun /root/.bun/bin/gbrain.real config set models.tier.subagent anthropic:claude-sonnet-4-6
```

## Verification
- `gbrain.real config get models.tier.subagent` now returns `anthropic:claude-sonnet-4-6`
- `gbrain.real doctor --json` now reports `subagent_capability` as `ok`
- MCP doctor now reports `subagent_capability` as `ok`

## Remaining warnings
- links extraction lag
- contextual retrieval coverage on one older page
