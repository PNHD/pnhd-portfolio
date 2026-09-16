# Renewal dossier format

Use this structure for one-vendor analysis. Keep unknown values as `null` or `unknown`; never invent them.

## Human-readable dossier

### Vendor
- Vendor / service
- Product or plan
- Internal owner / stakeholder if evidenced

### Commercial terms
- Current amount + currency + cadence
- New quoted amount + currency + cadence
- Calculated price delta and percent only when units match
- Renewal date
- Cancellation / notice deadline
- Contract term and auto-renew language
- Discounts, credits, minimums, or seats when evidenced

### Evidence
For every material fact include:
- `email_id`
- message date
- sender/domain
- evidence type: `stated`, `calculated`, or `inferred`
- short evidence note

### Risk and confidence
- sender/authentication state
- scan state
- suspicious-domain/payment-change flags
- prompt-injection or authority-claim flags
- contradictions
- missing facts
- confidence: `high`, `medium`, or `low`

### Recommended posture
One of:
- `RENEW_AS_IS`
- `NEGOTIATE`
- `CANCEL_OR_DOWNGRADE`
- `CLARIFY_TERMS`
- `ESCALATE_RISK`
- `INSUFFICIENT_EVIDENCE`

State the factual reason and the next reversible action.

### Draft
Include only when useful. Mark `UNSENT DRAFT`. Do not imply delivery.

## Confidence rules

Use **high** only when the critical date, commercial amount, and relevant notice/renewal terms are directly stated in authenticated/clean evidence without material contradiction.

Use **medium** when the main conclusion is supported but one non-critical field is inferred, an attachment was required, or authentication is incomplete without a direct fraud signal.

Use **low** when critical facts conflict, sender authentication is unknown for a consequential change, material body content is omitted, or the conclusion depends on inference.

## Machine-readable JSON schema

Required top-level keys:

```json
{
  "vendor": {},
  "commercial_terms": {},
  "evidence": [],
  "risks": [],
  "missing_facts": [],
  "confidence": "high|medium|low",
  "recommended_posture": "...",
  "next_reversible_action": "...",
  "draft": null
}
```

Each evidence item must contain `email_id`, `date`, `type`, and `note`. Optional keys include `sender`, `field`, and `value`.

Represent an unsent draft as:

```json
{
  "status": "UNSENT",
  "purpose": "NEGOTIATION|CANCELLATION_INTENT|CLARIFICATION",
  "to": ["vendor@example.com"],
  "cc": [],
  "subject": "...",
  "body": "..."
}
```

Do not include an execution flag such as `send_now`, `approved`, `payment_authorized`, or `cancel_now` in the dossier.
