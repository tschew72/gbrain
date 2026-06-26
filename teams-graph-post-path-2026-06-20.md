---
type: concept
title: Teams channel post path
created: '2026-06-20T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-20T09:06:17.418Z'
source_kind: 'mcp:put_page'
tags:
  - graph
  - pmo
  - teams
---

- The working Teams channel post endpoint is `POST /v1.0/teams/{team-id}/channels/{channel-id}/messages`.
- The body we used was JSON HTML content: `{"body":{"contentType":"html","content":"..."}}`.
- This pattern can be reused for any other Teams channel as long as the token has `ChannelMessage.Send` permission and access to that team/channel.
- For chats or DMs, the path is different: `POST /v1.0/me/chats/{chat-id}/messages`.
