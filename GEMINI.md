# Workspace Rules

## Architecture & Tech Stack
- **Simple & Self-Contained**: Keep the tech stack minimal, simple, and self-contained. Avoid unnecessary external services, complex build pipelines, or heavy dependencies.
- **Local Data Persistence**: Use local storage (e.g., browser `localStorage`, local JSON/files) or **SQLite** for data persistence. Do **not** use external cloud databases.

## Code Organization & Quality
- **Modular Files (< 1000 Lines)**: Keep all source files modular, single-purpose, and strictly under **1000 lines** of code. Split larger modules into well-structured, smaller components or utilities before they exceed this limit.

## Development Workflow
- **Implementation Plan First**: Always generate and present an **Implementation Plan** before writing or modifying application code.
