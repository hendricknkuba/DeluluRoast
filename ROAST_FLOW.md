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
   - then tries to enhance it with OpenAI

## Fallback Levels

- Best:
  - local template + OpenAI rewrite
  - meta reason: `enhanced`

- Good:
  - local template + partial AI support such as local classifier fallback
  - if rewrite is unavailable or rejected, local roast still returns

- Safe:
  - local-only roast or safe blocked message
  - meta reason:
    - `fallback_local`
    - `blocked_moderation`
    - `blocked_non_kpop`
    - `needs_disambiguation`

## API Success Shapes

### Roast generated

```json
{
  "ok": true,
  "data": {
    "roast": "...",
    "meta": {
      "source": "local",
      "reason": "fallback_local"
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
