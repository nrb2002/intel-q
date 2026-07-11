# Intel-Q Constitution

## Core Principles

### I. Simplicity
Prefer the smallest solution that works. Use Next.js built-in features before introducing extra libraries or architecture layers.

### II. Type Safety
All application code should use TypeScript and clear types for shared data, API inputs, and outputs.

### III. Security by Default
Secrets and credentials must stay in environment variables. Sensitive logic should run on the server, not in client components.

### IV. Test Critical Paths
Before shipping user-facing changes, verify the relevant flow with an automated test or a smoke check.

### V. Production Readiness
Changes must build and run successfully in a supported development environment before being considered complete.

## Additional Constraints
This project uses Next.js for a full-stack application. Prefer the App Router, keep route handlers focused, and use server components by default unless client interactivity is required.

## Development Workflow
Changes should be small, reviewable, and verified with the relevant build or test command before merge. If a change affects data flow, auth, or environment configuration, document the impact clearly.

## Governance
This constitution supersedes ad-hoc practices. Any exception must be explicitly documented and reviewed.

**Version**: 1.0.0 | **Ratified**: 2026-07-11 | **Last Amended**: 2026-07-11
