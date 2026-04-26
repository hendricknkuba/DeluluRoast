# Roast Flow

This file describes the current backend roast flow.

## Input Path

1. Frontend sends `POST /roasts/generate` with:
   - `mode`
   - `severity`
   - `subject`

2. Backend validates the payload with Zod.

3. Backend moderates the target input first.
   - If moderation flags the target:
     - returns a safe blocked message
     - response meta:
       - `source: "local"`
       - `reason: "blocked_moderation"`

4. Backend checks local ambiguity rules.
   - Explicit cases resolve directly:
     - `Mark from NCT`
     - `V (BTS)`
     - `Lisa Blackpink`
   - Ambiguous cases like `Mark` return options instead of a roast
   - response meta:
     - `source: "local"`
     - `reason: "needs_disambiguation"`

5. Backend classifies whether the target is K-pop related.
   - Uses OpenAI Structured Outputs when available
   - Falls back to local heuristics when OpenAI is unavailable

6. If the target is not K-pop related:
   - returns:
     - `This stage is K-pop only. Bring an idol, group, fandom, song, or era.`
   - response meta:
     - `source: "local"`
     - `reason: "blocked_non_kpop"`

7. If the target passes:
   - backend builds a local roast from templates
   - backend only attempts OpenAI rewrite if the cost gate passes:
     - rewrite enabled
     - severity meets `OPENAI_REWRITE_MIN_SEVERITY`
     - `safeContext` exists when `OPENAI_REWRITE_REQUIRE_CONTEXT=true`
   - otherwise it returns local output directly

## Fallback Levels

- Best:
  - local template + OpenAI rewrite
  - meta reason: `enhanced`

- Good:
  - local template + partial AI support such as classifier/context help
  - OpenAI can still fall back after an attempted rewrite
  - meta reason:
    - `fallback_error`
    - `fallback_rejected_output`

- Safe:
  - local-only roast by policy or safe blocked message
  - meta reason:
    - `local_only_by_policy`
    - `blocked_moderation`
    - `blocked_non_kpop`
    - `needs_disambiguation`

## Current Meta Reasons

- `enhanced`
  - OpenAI rewrite succeeded and was used.
- `fallback_error`
  - OpenAI rewrite was attempted but the API call failed.
- `fallback_rejected_output`
  - OpenAI rewrite was attempted but the output was rejected as unsafe or too generic.
- `local_only_by_policy`
  - Backend intentionally skipped OpenAI due to rewrite policy or unavailable rewrite configuration.
- `blocked_moderation`
  - Input was blocked by moderation.
- `blocked_non_kpop`
  - Target was classified as non-K-pop.
- `needs_disambiguation`
  - Target is ambiguous and the API returned options instead of a roast.

## API Success Shapes

### Roast generated

```json
{
  "ok": true,
  "data": {
    "roast": "...",
    "meta": {
      "source": "local",
      "reason": "local_only_by_policy"
    }
  }
}
```

### Ambiguous target

```json
{
  "ok": true,
  "data": {
    "meta": {
      "source": "local",
      "reason": "needs_disambiguation"
    },
    "options": [
      {
        "id": "mark_nct",
        "label": "Mark — NCT",
        "name": "Mark",
        "group": "NCT"
      }
    ]
  }
}
```

## Current Limitation

The frontend now supports ambiguous options, but the final chosen option is still resubmitted as a resolved string like `Mark from NCT`. There is not yet a dedicated candidate-selection API.
