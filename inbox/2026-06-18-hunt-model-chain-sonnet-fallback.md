---
type: 'note'
title: 'Hunt agent model chain: gpt-4o → gpt-4o-mini → claude-sonnet-4-6'
captured_at: '2026-06-18T03:47:00.000Z'
captured_via: 'capture-cli'
ingested_via: 'put_page'
ingested_at: '2026-06-18T03:46:22.079Z'
source_kind: 'put_page'
created: '2026-06-18T03:46:22.079Z'
---

# Hunt agent model chain: gpt-4o → gpt-4o-mini → claude-sonnet-4-6

Hunt (procurement agent, channel #procurement / 1514550444377243758) model chain as of 2026-06-18 11:47 SGT:

- **primary**: `openai/gpt-4o`
- **fallback 1**: `openai/gpt-4o-mini`
- **fallback 2**: `claude-cli/claude-sonnet-4-6` (changed from `zai/glm-5.1` per Vince)

## Caveats
- `OPENAI_API_KEY` is not in env. If not configured elsewhere (1Password, etc.), OpenAI calls fail and Hunt cascades through fallbacks. Verify key location before Hunt needs to spawn.
- Live Hunt session in #procurement still on `kimi-for-coding` from before gateway restart — session-keeps-original-model pattern. Will pick up new chain on next session spawn.

## Related
- `decisions/2026-06-18-main-agent-sonnet-4-6` — Max also Sonnet
- `inbox/2026-06-18-full-restart-no-model-switch` — gateway restart doesn't switch session models

tags: [openclaw, model, hunt, openai, claude-sonnet-4-6, procurement, lessons, config]
---
