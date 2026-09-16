# Live Mermail verification

Date: 2026-09-16

The packaged skill was live-verified against Mermail's official hosted MCP endpoint using a workspace API key supplied through a one-time backend secret entry. The key was never written to the skill source, submission bundle, Airtable, or chat.

A temporary deployment healthcheck was hard-gated on all of the following succeeding against the live Mermail MCP server:

1. MCP `initialize`
2. MCP `tools/list`
3. read-only `list_mailboxes`
4. presence of `list_mailboxes`
5. presence of `search_emails`
6. presence of `get_email`
7. presence of `get_email_context`
8. presence of `save_draft`

The verification deployment reached `READY` with empty frontend, network, and backend error arrays. The exact verification snapshot was `1789547071881`.

After verification, the deployment healthcheck was restored to a lightweight local check to avoid repeatedly consuming Mermail API credits. The separate read-only `/api/verify` route remains available for an explicit re-check before submission.

## OAuth note

ChatGPT custom-MCP OAuth returned Mermail's `Invalid request` page for both `/mcp` and `/mcp?profile=agent-inbox`. The live proof therefore uses Mermail's documented API-key/headless authentication path instead of pretending OAuth worked.
