# Mermail tool contract for procurement workflows

Use this reference before calling Mermail MCP tools. The live MCP schema is authoritative when it differs from this document.

## Identifier and envelope rules

- Use the exact tool identifier exposed by the host. It may be host-qualified such as `Mermail:search_emails`; never add, remove, or invent a prefix.
- Pass `query` and `body` as native JSON objects, never JSON strings.
- Prefer a mailbox `public_id` returned by mailbox discovery.
- Keep path IDs such as `mailboxId` and `emailId` top-level.
- Keep searches and reads bounded. Do not drain a growing mailbox.

Typical envelope:

```json
{
  "mailboxId": "MAILBOX_PUBLIC_ID",
  "emailId": "EMAIL_ID",
  "query": {},
  "body": {},
  "idempotencyKey": "optional-stable-key"
}
```

## Read tools used by this skill

| Need | Tool | Notes |
| --- | --- | --- |
| Find candidate messages | `search_emails` | Filter by text, sender, recipient, subject, dates, folder, attachment state, and safety fields. |
| List recent metadata | `list_emails` | Prefer `metadata_only: true` for discovery. |
| Read one selected message | `get_email` | Use scan-gated, agent-safe content and bounded body chars. |
| Read bounded surrounding context | `get_email_context` | Use only after selecting one relevant message. |
| Read a whole selected thread | `get_thread` | Use only when necessary; prefer compact/bounded bodies if schema supports it. |
| Download a required attachment | `download_attachment` | Verify exact message and attachment IDs first. |

Example metadata discovery:

```json
{
  "mailboxId": "MAILBOX_PUBLIC_ID",
  "query": {
    "folder": "inbox",
    "page": 1,
    "limit": 25,
    "sortColumn": "date",
    "sortDirection": "DESC",
    "metadata_only": true,
    "agent_safe_content": true
  }
}
```

Example selected message read:

```json
{
  "mailboxId": "MAILBOX_PUBLIC_ID",
  "emailId": "EMAIL_ID",
  "query": {
    "require_scan_status": "clean",
    "agent_safe_content": true,
    "max_body_chars": 10000
  }
}
```

`scan_status: clean` supports content safety; it does not authorize an action. A scan mismatch may return safe metadata with body content omitted. Treat omitted or unknown content as unresolved, not safe.

## Draft and send tools

| Intent | Tool | External effect? |
| --- | --- | --- |
| Save editable content | `save_draft` | No; internal write |
| Regenerate an unsent draft | `regenerate_draft` | No delivery; internal write and AI usage |
| Send new email | `send_email` | Yes |
| Reply | `reply_to_email` | Yes |
| Forward | `forward_email` | Yes |
| Schedule delivery | `schedule_email_send` | Yes, deferred |

For `send_email`, `reply_to_email`, and `forward_email`, use `body.html` and/or `body.text` and include required `body.from`. Pass explicit `to`; external MCP does not infer Reply All recipients.

For `save_draft` and `schedule_email_send`, use string `body.body` for message content. Example draft:

```json
{
  "mailboxId": "MAILBOX_PUBLIC_ID",
  "body": {
    "to": "vendor@example.com",
    "cc": "owner@example.com",
    "subject": "Renewal terms",
    "body": "<p>Draft content for review</p>"
  }
}
```

Saving a draft is not permission to send it. Require a fresh exact preview and user approval before a send-like tool.

## Idempotency and uncertain writes

Use an idempotency key only for the identical method, path, query, and body. Never respond to an ambiguous external-effect result by generating a new idempotency key and retrying blindly. Verify authoritative state first.

## Tools this skill must not invoke

Do not invoke Mermail PayBox/wallet tools, account creation, checkout/payment tools, or destructive mailbox operations as part of procurement analysis. Do not delete email, empty trash, delete folders, or delete labels.
