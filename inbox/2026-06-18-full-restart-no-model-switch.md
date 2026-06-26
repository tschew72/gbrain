---
type: 'note'
title: 'Full gateway restart also does NOT switch a session''s model'
captured_at: '2026-06-18T02:48:00.000Z'
captured_via: 'capture-cli'
ingested_via: 'put_page'
ingested_at: '2026-06-18T02:47:30.762Z'
source_kind: 'put_page'
created: '2026-06-18T02:47:30.762Z'
---

# Full gateway restart also does NOT switch a session's model

Confirmed 2026-06-18 10:47 SGT: a **full gateway restart** (not just hot-reload) also leaves existing sessions on their original model assignment. The session only picks up the new gateway default on its next **fresh creation** (new session ID), not on resume. So even with `agents.defaults.model.primary = claude-cli/claude-sonnet-4-6` set correctly and a clean gateway restart, an existing Discord-channel session keeps M3 until either:
- the session is killed/expires and a new one is spawned
- `session_status(model="claude-cli/claude-sonnet-4-6")` is called explicitly to override

Practical implication: don't expect `gateway restart` to push model changes to live sessions. Only new sessions get the new default. For an immediate switch in the current session, use the session_status override.
tags: [openclaw, gateway, model, session, restart, claude-sonnet-4-6, lessons, fact]
---
