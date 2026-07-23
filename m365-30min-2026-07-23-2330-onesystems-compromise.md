---
type: concept
title: 'M365 delta: OneSystems suspected CEO email compromise'
date: '2026-07-23T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T15:33:06.830Z'
source_kind: 'mcp:put_page'
tags:
  - client-signal
  - email
  - m365
  - onesystems-technologies
  - security-incident
---

## Signal

A high-importance inbox email from **Mazy Yeoh / OneSystems Technologies** reported a suspected compromise of the CEO's company email account.

## Details

- Suspicious outbound request reportedly asked for the **AR Aging Report** and **vendors' email addresses**.
- Actions already taken by the client:
  - Password reset for the CEO's Windows/Microsoft 365 account
  - Revoked active sign-in sessions
  - Reviewed Entra sign-in logs with no unusual IP or location identified
  - Checked Exchange message trace and found only one suspicious outgoing email so far
- The CEO reportedly connected to a **hotel Wi-Fi** network the day before.
- The sender asked for backend checks and advice on whether further laptop/mobile investigation is needed.

## Why it matters

This is a live client security-incident thread, not just a routine support question. The immediate value for Evvo is to treat it as a possible business email compromise case and watch for follow-on indicators, especially if the hotel Wi-Fi detail later correlates with another sign-in or device compromise.
