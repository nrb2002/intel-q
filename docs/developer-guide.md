# Intel-Q Developer Guide

**Project:** Intel-Q – Intelligent Queue Management System  
**Framework:** Next.js (App Router)  
**Language:** TypeScript  
**Database:** MongoDB + Mongoose  
**Authentication:** Auth.js v5  
**Hosting:** Vercel

---

# Overview

Welcome to the Intel-Q development team!

This guide explains how to set up your local development environment, follow the team's coding standards, use GitHub effectively, and contribute to the project. Following this guide helps ensure consistency, code quality, and smooth collaboration throughout the project.

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15+ (App Router) | Full-stack React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | Reusable UI components |
| MongoDB | Database |
| Mongoose | ODM |
| Auth.js v5 | Authentication |
| Vercel | Deployment |
| GitHub | Version Control |
| GitHub Projects | Project Management |

---

# Local Development Setup

## 1. Clone the Repository

```bash
git clone https://github.com/<organization>/intel-q.git
cd intel-q
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
MONGODB_URI=mongodb://localhost:27017/intel-q

AUTH_SECRET=your-secret-key

AUTH_URL=http://localhost:3000
```

> **Important:** Never commit `.env.local` to GitHub. Update `.env.example` whenever new environment variables are introduced.

---

## 4. Start the Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# Project Structure

```text
src/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── layout.tsx
│
├── components/
│   ├── layout/
│   ├── queue/
│   ├── ui/
│   └── shared/
│
├── lib/
│   └── mongodb.ts
│
├── models/
│   ├── User.ts
│   ├── Branch.ts
│   └── QueueTicket.ts
│
├── services/
│
├── hooks/
│
├── types/
│
└── utils/
```

---

# Git Workflow

## Create a Feature Branch

Always branch from `main`.

```bash
git checkout main
git pull

git checkout -b feature/queue-api
```

Examples:

```
feature/authentication
feature/login-page
feature/navbar
feature/database
bug/login-error
docs/update-readme
```

---

## Commit Changes

Use clear, descriptive commit messages.

Examples:

```text
feat: add queue ticket API

fix: resolve login redirect issue

docs: update developer guide

refactor: simplify database connection

style: improve dashboard layout
```

---

## Push Your Branch

```bash
git push origin feature/queue-api
```

Open a Pull Request and request a review before merging.

---

# Pull Request Checklist

Before submitting a Pull Request:

- Project builds successfully
- No TypeScript errors
- No ESLint errors
- Responsive layout verified
- Related GitHub issue referenced
- Documentation updated (if needed)

At least one teammate should review and approve the Pull Request before merging.

---

# Coding Standards

## TypeScript

- Enable strict mode.
- Avoid using `any`.
- Define interfaces for props, API responses, and data models.
- Prefer explicit types.

Example:

```ts
interface QueueTicket {
  ticketNumber: number;
  status: "Waiting" | "In Service" | "Completed";
}
```

---

## React Components

- Use functional components.
- Prefer Server Components by default.
- Use Client Components only when needed (state, events, browser APIs).
- Keep components focused on a single responsibility.

---

## File Naming

| Item | Convention |
|------|------------|
| React Components | PascalCase |
| Hooks | camelCase (e.g., `useQueue.ts`) |
| Utility files | camelCase |
| Routes | kebab-case |
| Models | PascalCase |
| Interfaces | PascalCase |

Examples:

```
QueueCard.tsx
Header.tsx
useQueue.ts
queue-utils.ts
```

---

# Folder Responsibilities

## app/

Contains pages, layouts, and API route handlers.

## components/

Reusable UI and layout components.

## models/

Mongoose schemas and models.

## lib/

Database connections and shared libraries.

## services/

Business logic and server-side operations.

## hooks/

Custom React hooks.

## utils/

General helper functions.

---

# Database Guidelines

Use Mongoose for all database access.

Avoid direct MongoDB driver usage.

Every model should include:

- Validation
- Required fields
- Timestamps

---

# Authentication

Use Auth.js v5.

Protected pages should verify authentication on the server.

Never expose secrets or sensitive business logic to client components.

---

# Styling Guidelines

Use:

- Tailwind CSS
- shadcn/ui

Avoid custom CSS unless absolutely necessary.

Maintain consistent spacing, typography, and colors based on the project's design theme.

---

# Responsive Design

Support:

- Mobile
- Tablet
- Desktop

Use Tailwind responsive utilities:

```html
sm:
md:
lg:
xl:
```

Test layouts before merging.

---

# Error Handling

Every form should provide:

- Validation feedback
- Loading states
- Error messages
- Empty states

API routes should return appropriate HTTP status codes.

---

# Testing

Before opening a Pull Request:

- Verify application builds successfully.
- Test your feature manually.
- Confirm no console errors.
- Verify responsive behavior.
- Check authentication (if applicable).

---

# GitHub Project Workflow

Move issues through these columns:

```
Backlog

↓

Ready

↓

In Progress

↓

In Review

↓

Done
```

Keep issue status up to date.

---

# Branch Protection

Do not commit directly to `main`.

Always:

- Create a feature branch
- Open a Pull Request
- Receive at least one approval
- Merge after review

---

# Definition of Done

A task is considered complete when:

- Acceptance criteria are met.
- Code follows project standards.
- Feature has been tested.
- Documentation is updated (if applicable).
- Pull Request has been reviewed and merged.
- Related GitHub issue is closed.

---

# Common Commands

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run linter:

```bash
npm run lint
```

Create production build:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

---

# Troubleshooting

## MongoDB Connection Errors

- Verify `MONGODB_URI` in `.env.local`.
- Ensure MongoDB is running or your Atlas cluster is accessible.

## Authentication Issues

- Check `AUTH_SECRET`.
- Verify Auth.js configuration.
- Confirm callback URLs match your environment.

## Build Errors

- Run:

```bash
npm run lint
```

- Resolve TypeScript errors.
- Restart the development server after changing environment variables.

---

# Team Communication

- Keep GitHub issues updated.
- Communicate blockers early.
- Review teammates' Pull Requests promptly.
- Document architectural decisions in the `docs/` directory.

---

# Additional Documentation

Refer to the following project documents:

- `README.md`
- `docs/intel-q-spec.md`
- `docs/constitution.md`
- `docs/database-design.md`
- `docs/design-theme-branding.md`
- `docs/component-architecture.md`
- `docs/week-04-milestone.md`

These documents provide the project's technical standards, architecture, and implementation roadmap.

---

# Final Notes

Intel-Q is being developed as a collaborative, production-style project. Write clean, maintainable code, communicate frequently with your teammates, and follow the agreed workflows. Prioritize simplicity, reliability, and consistency to deliver a successful MVP within the project timeline.