# Project Instructions

## TypeScript Guidelines

All code generated, modified, or suggested by the agent **must use TypeScript with strict typing enabled**.

### Mandatory Rules

- **Strong typing is mandatory when writing TypeScript**: every variable, function parameter, return type, and object structure must be explicitly or inferably typed.
- **`any` is strictly forbidden**, including:
  - Explicit `any`
  - Implicit `any`
  - `any` introduced via loose generics or unchecked casts
- Do not bypass typing using `as any`, `unknown` followed by unsafe casting, or similar workarounds.

### Type Safety Requirements

- Prefer **explicit types** for public APIs and exported symbols.
- Use **strict TypeScript compiler options**, including (but not limited to):
  - `strict: true`
  - `noImplicitAny: true`
  - `strictNullChecks: true`
- When dealing with dynamic or external data:
  - Define proper interfaces or types
  - Use type guards, validation, or parsing logic
  - Narrow types safely before usage

### Recommended Practices

- Prefer `interface` or `type` definitions over inline object typing for non-trivial structures.
- Use discriminated unions where applicable.
- Leverage generics with proper constraints instead of falling back to loose typing.
- If a type is unclear or cannot be determined safely, **pause and ask for clarification rather than guessing**.

### Prohibited Patterns

- Using `any` as a shortcut to silence TypeScript errors
- Disabling TypeScript checks to make code compile
- Returning untyped objects from functions
- Relying on runtime behavior instead of compile-time guarantees

---

**Primary goal:** maximize type safety, correctness, and maintainability.  
**If strict typing cannot be satisfied, the agent must not generate the code.**
