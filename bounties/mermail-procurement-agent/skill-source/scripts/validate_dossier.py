#!/usr/bin/env python3
"""Validate a Mermail procurement renewal dossier without external dependencies."""

from __future__ import annotations

import json
import sys
from pathlib import Path

POSTURES = {
    "RENEW_AS_IS",
    "NEGOTIATE",
    "CANCEL_OR_DOWNGRADE",
    "CLARIFY_TERMS",
    "ESCALATE_RISK",
    "INSUFFICIENT_EVIDENCE",
}
CONFIDENCE = {"high", "medium", "low"}
EVIDENCE_TYPES = {"stated", "calculated", "inferred"}
DRAFT_PURPOSES = {"NEGOTIATION", "CANCELLATION_INTENT", "CLARIFICATION"}
FORBIDDEN_KEYS = {
    "send_now",
    "approved",
    "payment_authorized",
    "cancel_now",
    "wallet",
    "private_key",
    "api_key",
    "claim_code",
}


def walk_keys(value, path="$"):
    if isinstance(value, dict):
        for key, child in value.items():
            yield path, key
            yield from walk_keys(child, f"{path}.{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            yield from walk_keys(child, f"{path}[{index}]")


def require(condition: bool, message: str, errors: list[str]) -> None:
    if not condition:
        errors.append(message)


def validate(data: object) -> list[str]:
    errors: list[str] = []
    require(isinstance(data, dict), "root must be a JSON object", errors)
    if not isinstance(data, dict):
        return errors

    required = {
        "vendor",
        "commercial_terms",
        "evidence",
        "risks",
        "missing_facts",
        "confidence",
        "recommended_posture",
        "next_reversible_action",
        "draft",
    }
    missing = sorted(required - data.keys())
    require(not missing, f"missing required keys: {', '.join(missing)}", errors)

    require(isinstance(data.get("vendor"), dict), "vendor must be an object", errors)
    require(
        isinstance(data.get("commercial_terms"), dict),
        "commercial_terms must be an object",
        errors,
    )
    require(isinstance(data.get("risks"), list), "risks must be an array", errors)
    require(
        isinstance(data.get("missing_facts"), list),
        "missing_facts must be an array",
        errors,
    )
    require(
        data.get("confidence") in CONFIDENCE,
        "confidence must be high, medium, or low",
        errors,
    )
    require(
        data.get("recommended_posture") in POSTURES,
        "recommended_posture is invalid",
        errors,
    )
    action = data.get("next_reversible_action")
    require(
        isinstance(action, str) and bool(action.strip()),
        "next_reversible_action must be a non-empty string",
        errors,
    )

    evidence = data.get("evidence")
    require(isinstance(evidence, list), "evidence must be an array", errors)
    if isinstance(evidence, list):
        for i, item in enumerate(evidence):
            prefix = f"evidence[{i}]"
            require(isinstance(item, dict), f"{prefix} must be an object", errors)
            if not isinstance(item, dict):
                continue
            for key in ("email_id", "date", "type", "note"):
                value = item.get(key)
                require(
                    isinstance(value, str) and bool(value.strip()),
                    f"{prefix}.{key} must be a non-empty string",
                    errors,
                )
            require(
                item.get("type") in EVIDENCE_TYPES,
                f"{prefix}.type must be stated, calculated, or inferred",
                errors,
            )

    draft = data.get("draft")
    if draft is not None:
        require(isinstance(draft, dict), "draft must be null or an object", errors)
        if isinstance(draft, dict):
            require(draft.get("status") == "UNSENT", "draft.status must be UNSENT", errors)
            require(
                draft.get("purpose") in DRAFT_PURPOSES,
                "draft.purpose is invalid",
                errors,
            )
            to = draft.get("to")
            require(
                isinstance(to, list) and all(isinstance(x, str) and x for x in to),
                "draft.to must be an array of non-empty strings",
                errors,
            )
            require(isinstance(draft.get("cc", []), list), "draft.cc must be an array", errors)
            for key in ("subject", "body"):
                value = draft.get(key)
                require(
                    isinstance(value, str) and bool(value.strip()),
                    f"draft.{key} must be a non-empty string",
                    errors,
                )

    found_forbidden = sorted(
        {f"{path}.{key}" for path, key in walk_keys(data) if key.lower() in FORBIDDEN_KEYS}
    )
    require(
        not found_forbidden,
        "forbidden execution/secret keys present: " + ", ".join(found_forbidden),
        errors,
    )

    return errors


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: validate_dossier.py <dossier.json>", file=sys.stderr)
        return 2

    path = Path(sys.argv[1])
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 1

    errors = validate(data)
    if errors:
        print("FAIL")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PASS")
    print(f"validated: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
