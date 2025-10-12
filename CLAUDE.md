# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tickaton Front is an expense tracking application built with React 19, TypeScript, and Vite. The application integrates with Supabase for authentication and a custom backend API for expense management.

## Development Commands

- **Start dev server**: `pnpm dev`
- **Build**: `pnpm build` (runs TypeScript compilation first, then Vite build)
- **Lint**: `pnpm lint`
- **Preview production build**: `pnpm preview`

Note: This project uses **pnpm** as the package manager.

## Environment Setup

Required environment variables (typically in `.env.local`):
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_PUBLIC_API_URL`: Backend API URL (defaults to `http://localhost:8080/api`)

## Architecture

### Authentication Flow
- Uses Supabase for authentication (src/lib/supabase/auth.ts and src/lib/supabase/client.ts)
- Access tokens are automatically injected into API requests via axios interceptor (src/lib/api/client.ts:12-22)
- Unauthorized (401) responses are handled globally in the axios response interceptor

### API Layer Structure
The application follows a domain-based API organization pattern:

1. **API Client** (src/lib/api/client.ts): Centralized axios instance with:
   - Automatic Supabase token injection
   - Base URL configuration
   - Global error handling

2. **Domain APIs** (src/lib/api/):
   - `expenses.ts`: CRUD operations for expenses
   - `expense-groups.ts`: CRUD operations for expense groups (supports both simple and paginated listing)
   - `persons.ts`: Person management
   - `expense-categories.ts`: Category management
   - Each exports a named object (e.g., `expensesApi`, `expenseGroupsApi`)

3. **Type Definitions** (src/types/api.ts):
   - Request/Response types for all API entities
   - Spring Boot pagination types (PageExpenseGroupResponse, PageableObject, SortObject)
   - Filter types for query parameters

### Routing
- Uses react-router-dom v7 with BrowserRouter (src/App.tsx:10-18)
- Routes:
  - `/login`: Login page
  - `/home`: Home page
  - `/expenses`: Expenses page
  - `/`: Redirects to `/login`

### State Management & UI
- react-hot-toast for notifications (configured in App.tsx with top-right positioning)
- No global state management library currently in use

### Path Aliases
TypeScript is configured with `@/` alias pointing to the `src/` directory (note: vite.config.ts needs to be checked for runtime alias configuration if not already present).

## Technical Details

### React Compiler
The React Compiler is enabled via Babel plugin in vite.config.ts:8-10. This automatically optimizes React components but impacts build performance. See https://react.dev/learn/react-compiler for details.

### TypeScript Configuration
- Uses project references pattern with tsconfig.json as root
- Strict mode enabled with additional linting flags (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- Target: ES2022 with bundler module resolution
- Two separate configs: `tsconfig.app.json` (for src/) and `tsconfig.node.json` (for build config)

### ESLint
- Configured with TypeScript ESLint, React Hooks, and React Refresh plugins
- Uses flat config format (eslint.config.js)
- Ignores `dist` directory
