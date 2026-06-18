---
type: lesson
title: 'Lesson — When Cadence is Decided, Don''t Re-Ask'
status: active
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-17T12:50:00.725Z'
source_kind: 'mcp:put_page'
tags:
  - cadence
  - clarity
  - digest
  - m365
  - questions
---

# Lesson: Don't Re-Ask Cadence Questions When Cadence is Already Decided

**Date:** 2026-06-17 20:49 SGT
**Channel:** #automation-solutions
**Trigger:** Vince pushed back — "Why do you ask what time of the day for daily digest when we are doing every 30 mins?"

## The Mistake
I asked "what time of day for the daily digest (00:00 / 08:30 / 09:00 weekdays?)" in the same breath as proposing a 30-min cron for Phuong. The question was a holdover from a different conversation thread (the standup digest cron, which I'd already removed at 20:24 SGT — that one was 00:30 + 01:30). After removing the standup, the only digest cadence being discussed was the 30-min cron. Asking "what time of day" was asking the same question twice under a different frame.

## The Pattern to Avoid
When proposing parallel work to an existing system, don't re-introduce the cadences the existing system already replaced. Specifically:
- 30-min cron covers "daily feed" use case — don't separately ask about a "daily cron"
- Real-time interactive binding covers "ask the brain" use case — don't ask about a separate "interactive digest"
- Standup cron covers "morning brief" use case — don't ask about a separate "morning summary"

## The Test Before Asking a Cadence Question
1. Is this a NEW question, or is it a re-ask of one I already asked/answered?
2. If the cadence is implied by the work being proposed (e.g., mirroring Vince's 30-min cron → Phuong's 30-min cron is implied), don't ask "when?" — assume mirror.
3. The only legitimate "when" questions are when there's a *genuine choice* the user must make. Mirror-implying decisions are not choices.

## Other Open Threads (resolved or self-evident)
- "What time of day" for daily digest — RESOLVED. Daily = 30-min cron, no separate schedule.
- "Backfill or not" for Phuong — Vince hasn't said. If 30-min goes live, backfill is a separate 1-shot ask.
- "Amelia stays or goes in fang-room" — still open, still needs Vince's call.

## Source
Vince's reply in #automation-solutions at 2026-06-17 20:49 SGT. Quoted: "Why do you ask what time of the day for daily digest when we are doing every 30 mins?"
