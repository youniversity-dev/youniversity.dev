# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
pnpm dev          # Start development server with Turbopack (http://localhost:3000)
pnpm build        # Build production version
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

**Package Manager**: This project uses pnpm v10.14.0. Always use `pnpm` instead of `npm` or `yarn`.

## Architecture

This is a **Next.js 15** application using the **App Router** architecture with **React 19**.

### Core Stack
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Tables**: @tanstack/react-table with drag-and-drop via @dnd-kit
- **Charts**: Recharts
- **Validation**: Zod
- **Theme**: next-themes for dark mode support

### Project Structure
```
src/
├── app/                    # App Router pages (server components by default)
│   ├── dashboard/         # Main dashboard route with data.json
│   └── layout.tsx        # Root layout with theme and sidebar
├── components/
│   ├── ui/               # shadcn/ui components (don't modify directly)
│   └── [features]/       # Feature-specific components
└── lib/
    └── utils.ts          # cn() helper for className merging
```

### Key Patterns

1. **Server vs Client Components**: 
   - Default to server components
   - Add "use client" only when needed (useState, useEffect, event handlers)
   - Dashboard data is currently static JSON

2. **Component Creation**:
   - Use shadcn/ui components as base (`src/components/ui/`)
   - Follow compound component pattern (see Sidebar components)
   - Use CVA for component variants

3. **Styling**:
   - Use Tailwind classes with cn() helper from `lib/utils`
   - Theme variables defined in globals.css
   - Dark mode: use `dark:` prefix or CSS variables

4. **TypeScript**:
   - Strict mode enabled
   - Use `@/` import alias for src directory

### Current State

- **Routing**: Root (/) redirects to /dashboard
- **Data**: Static JSON files (no API integration yet)
- **Authentication**: Not implemented
- **Testing**: No testing framework configured
- **Environment Variables**: Not configured

### Important Notes

- This project uses cutting-edge versions (Next.js 15, React 19, Tailwind v4)
- No testing framework is set up - manual testing required
- Static data in dashboard/data.json needs to be replaced with API calls
- Sidebar navigation is fully implemented with collapsible sections