---
type: 'monitor'
title: 'Vn Sea Opportunities'
date: '2026-06-12T00:00:00.000Z'
domain: 'feed'
status: 'active'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-12T01:08:43.180Z'
source_kind: 'mcp:put_page'
tags:
  - 'newsjack'
  - 'sea'
  - 'teams'
  - 'vietnam'
created: '2026-06-12T00:00:00.000Z'
---

# vn-sea-opportunities monitor

Daily newsjack monitor replacing the prior aileen-vn-bd + anna-vn-ops pair.
Cron: 0 7 * * * Asia/Singapore (id: e2609c97-a1c3-433a-91e9-54f69b71a207).
Output channel: Microsoft Teams chat id 19:a376f196711f4ca4bfdac53988158e50@thread.v2 (Do less, Think BIG, Execute flawlessly).
Audience: Andrew, Anna, Finn, Vincent, Aileen, Loan, Fang, Vince.

## Files
- Monitor dir: /root/.newsjack/monitors/vn-sea-opportunities/
- Brief: /root/.newsjack/monitors/vn-sea-opportunities/brief.md
- Profile: /root/.newsjack/monitors/vn-sea-opportunities/profile.json
- Poster script: /root/scripts/teams-newsjack-post.sh
- HTML helper: /tmp/md_to_html.py
- Token refresh: /root/scripts/refresh_o365_token.py

## Detector invocation
    /root/.newsjack/bin/newsjack detector run       --profile /root/.newsjack/monitors/vn-sea-opportunities/profile.json       --monitor-name vn-sea-opportunities       --depth quick       --limit 20       --feed-only       --major-feeds       --save       --new-only       --max-age-hours 48

## Profile schema gotcha (June 2026)
The newsjack binary (v0.42+) ignores nested .profile key and only reads top-level
keys (company, competitors, topics, search_terms, feed_urls, x_news, x_trends,
exclusions, brief_draft, feed_rationale, etc). Old monitor profiles (aileen-vn-bd,
anna-vn-ops) had everything under .profile and got silently stripped to empty
schema (206 bytes saved) by recent runs. Fix: flatten the profile.json to top-level
keys + keep brief_draft as a separate companion object.

## Auth
- Token: /root/.outlook-mcp/credentials.json
- Scopes: Chat.ReadWrite, Mail.ReadWrite, Calendars.ReadWrite, etc.
- Refresh: /root/scripts/refresh_o365_token.py (auto-skip if >20min remaining)
- 401 retry: script forces --force refresh and retries once

## Failure handling
- Cron: 2-strike failureAlert → #notifications (1473990130468524063) with 1h cooldown
- Script: exits 0/1/2/3 (success/detector-fail/no-token/graph-fail)
- No-signal case: posts explicit "No pitch-ready angles in last 48h" message
