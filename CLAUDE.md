# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tickaton Front is a React 19 application built with TypeScript and Vite. The project uses **React Compiler** (babel-plugin-react-compiler) which is enabled by default and impacts build/dev performance.

## Development Commands

- **Start dev server**: `pnpm dev`
- **Build**: `pnpm build` (runs TypeScript compilation first, then Vite build)
- **Lint**: `pnpm lint`
- **Preview production build**: `pnpm preview`

Note: This project uses **pnpm** as the package manager (evidenced by pnpm-lock.yaml).

## Key Technical Details

### TypeScript Configuration
- Uses strict TypeScript settings with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` enabled
- Target: ES2022 with bundler module resolution
- Two separate tsconfig files: `tsconfig.app.json` (for src/) and `tsconfig.node.json` (for build config)

### React Compiler
The React Compiler is enabled via Babel plugin in vite.config.ts (vite.config.ts:8-10). This automatically optimizes React components but impacts build performance. See https://react.dev/learn/react-compiler for details.

### ESLint
- Configured with TypeScript ESLint, React Hooks, and React Refresh plugins
- Uses the new flat config format (eslint.config.js)
- Ignores `dist` directory

## Architecture

This is currently a minimal React application with:
- Entry point: src/main.tsx
- Root component: src/App.tsx
- Single page application structure
- Standard Vite + React setup with HMR

The codebase is in early stages with a basic "Test" component in App.tsx.
