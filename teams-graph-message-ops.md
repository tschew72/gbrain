---
type: concept
title: Microsoft Graph Teams message ops
created: '2026-06-20T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-20T09:10:23.474Z'
source_kind: 'mcp:put_page'
tags:
  - graph
  - messaging
  - teams
---

- Read Teams channel messages with `GET /v1.0/teams/{team-id}/channels/{channel-id}/messages`.
- Send to a Teams channel with `POST /v1.0/teams/{team-id}/channels/{channel-id}/messages`.
- Read Teams chats / DMs with `GET /v1.0/me/chats/{chat-id}/messages`.
- Send to a Teams chat / DM with `POST /v1.0/me/chats/{chat-id}/messages`.
- Channel posting needs `ChannelMessage.Send` permission.
- Chat posting needs `Chat.ReadWrite`.
- The channel body format we used is JSON with `body.contentType="html"` and `body.content` containing the message.
