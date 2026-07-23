---
type: note
title: Fang M365 Digest Reporting Rules
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-16T03:13:02.415Z'
source_kind: 'mcp:put_page'
tags:
  - m365
  - reporting
  - rules
---

# Fang M365 Digest Reporting Rules

Use these rules for all future reports:

- Project name must come from the Client/Project Name in the Excel workbook.
- Do not use the service type as the project name.
- Use Pending Tasks from the Excel workbook whenever available.
- Only use Outlook or Teams to update task status or identify new client requests.
- Do not infer or create new tasks from email conversations.
- Risk Status rules:
  - VAPT: open >30 days or no client response >7 days
  - Consultant: open >180 days or no client response >14 days
  - CISO: no client response >14 days
- Do not mark a project At Risk simply because an email is unreplied.
- Upcoming Deadline must use only milestone dates stored in the workbook.
- Do not infer deadlines from email conversations.

## Facts

<!--- gbrain:facts:begin -->
| # | claim | kind | confidence | visibility | notability | valid_from | valid_until | source | context |
|---|-------|------|------------|------------|------------|------------|-------------|--------|---------|
| 1 | Project name must come from the Client/Project Name in the Excel workbook, not the service type | belief | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
| 2 | Pending Tasks must come from the Excel workbook when available | belief | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
| 3 | Task status updates and new client requests must come from Outlook or Teams only | belief | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
| 4 | Do not infer or create new tasks from email conversations | belief | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
| 5 | VAPT risk threshold: task open >30 days or no client response >7 days | fact | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
| 6 | Consultant risk threshold: task open >180 days or no client response >14 days | fact | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
| 7 | CISO risk threshold: no client response >14 days | fact | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
| 8 | Do not mark a project At Risk simply because an email is unreplied | belief | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
| 9 | Upcoming Deadline must use only milestone dates stored in the workbook, not emails | belief | 1.0 | private | low | 2026-07-16 |  | mcp:put_page |  |
<!--- gbrain:facts:end -->
