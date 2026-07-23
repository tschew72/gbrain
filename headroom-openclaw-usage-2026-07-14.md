---
type: concept
title: Headroom for OpenClaw
created: '2026-07-14T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-14T11:54:40.263Z'
source_kind: 'mcp:put_page'
---

- Use `headroom wrap openclaw` to install and configure the Headroom OpenClaw plugin in one command.
- The wrapper installs the plugin, writes minimal config, sets the `contextEngine` slot, validates config, and restarts the OpenClaw gateway unless `--no-restart` is passed.
- If you already have a proxy running, pass `--proxy-port 8788` to point OpenClaw at that instance.
- Default gateway provider id is `openai-codex`; it can be repeated/overridden with `--gateway-provider-id`.

## Facts

<!--- gbrain:facts:begin -->
| # | claim | kind | confidence | visibility | notability | valid_from | valid_until | source | context |
|---|-------|------|------------|------------|------------|------------|-------------|--------|---------|
| 1 | openclaw.memory_search is currently unavailable because the indexed embedding model does not match the active runtime expectation | fact | 1.0 | private | low | 2026-07-22 |  | mcp:put_page |  |
| 2 | Expected runtime model is text-embedding-3-small (OpenAI) | fact | 1.0 | private | low | 2026-07-22 |  | mcp:put_page |  |
| 3 | Indexed model is embeddinggemma-300m-qat-Q8_0.gguf | fact | 1.0 | private | low | 2026-07-22 |  | mcp:put_page |  |
| 4 | Semantic memory search is paused until the index is rebuilt or aligned with the active embedding provider | fact | 1.0 | private | low | 2026-07-22 |  | mcp:put_page |  |
| 5 | openclaw.memory_get is the fallback for direct file reads while semantic retrieval is unavailable | fact | 1.0 | private | low | 2026-07-22 |  | mcp:put_page |  |
<!--- gbrain:facts:end -->
