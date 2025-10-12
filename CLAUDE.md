# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 application using React 19.1.0, TypeScript, and Turbopack for faster builds. The project follows the Next.js App Router architecture with a minimal initial setup.

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Starts the Next.js development server with Turbopack at http://localhost:3000. The app auto-reloads on file changes.

### Building for Production
```bash
npm run build
```
Creates an optimized production build using Turbopack.

### Starting Production Server
```bash
npm start
```
Runs the production build locally (must run `npm run build` first).

## Project Architecture

### Directory Structure
- **`src/app/`** - Next.js App Router directory
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles
  - `page.module.css` - CSS modules for page-specific styles

### TypeScript Configuration
- Uses path alias `@/*` mapping to `./src/*` for cleaner imports
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler (optimized for Next.js)

### Font Configuration
The project uses Geist Sans and Geist Mono fonts from next/font/google, configured in `src/app/layout.tsx:5-13` with CSS variables:
- `--font-geist-sans`
- `--font-geist-mono`

### Styling Approach
The project uses CSS Modules for component-level styling. Import styles with:
```typescript
import styles from "./component.module.css";
```

## Key Technologies
- **Next.js 15.5.4** with App Router
- **React 19.1.0** (latest stable)
- **TypeScript 5**
- **Turbopack** for fast compilation and builds
