---
type: lesson
title: 'Counter metrics should count what you did, not what you got back'
date: '2026-06-16T00:00:00.000Z'
status: shipped
sources:
  - 'm365-30min:2026-06-16T1207'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-16T04:07:23.959Z'
source_kind: 'mcp:put_page'
---

# Counter metrics should count what you did, not what you got back

**Date:** 2026-06-16 12:07 SGT
**Trigger:** Vince asked "why failed" after a 30-min cron run showed `total_chat_polls_attempted: 0` with no error output.

**The bug:** Stat was computed as `len(chat_poll_failures) + len(chat_msgs)`. When there are 0 failures AND 0 new messages, this equals 0 — **even if the polling loop ran successfully and the Graph API returned 200 with no new messages**. The stat conflates "nothing happened" with "nothing was attempted."

**The downstream cost:** A "0" stat on a silent success is worse than no stat at all — it actively misleads operators into thinking the loop didn't run, prompting debugging of a non-bug.

**The fix:** Add an actual counter inside the polling loop, incremented before each poll attempt. Return it alongside the result and failure lists. Now the stat reports poll count regardless of outcome.

**General principle:** Any time you're tempted to compute a count as `len(successes) + len(failures)`, ask: what does it report when both are 0? If the answer is "no information about whether the loop actually ran" — add an explicit counter.

**Related:**
- `decisions/2026-06-16-m365-teams-polling-fix` — the underlying Graph $filter bug
- The M3 morning cycle where I reported "0 new chats" for 13h as if the polling was working, when in fact it was failing silently
