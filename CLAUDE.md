# AI Input Assist - Project Guidelines

## Project Overview
- POC for AI-assisted form filling from Word/Excel files
- Modal UI that auto-populates fields from uploaded documents
- Part of a larger system for SES management application

## Development Approach
- Follow TDD principles by t-wada
- Write tests first, then implementation
- Keep tests simple and focused
- Red-Green-Refactor cycle

## Common Commands
- Development: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm test` (after Jest setup)

## Technology Stack
- Next.js 15 with App Router
- TypeScript with strict mode enabled
- Tailwind CSS for styling
- Shadcn/ui for UI components
- Jest + React Testing Library for testing

## Code Style
- Use 2-space indentation
- Follow ESLint configuration (next/core-web-vitals, next/typescript)
- Prefer named exports over default exports
- Use TypeScript strict mode features

## File Structure
- Components in `components/` directory
- Use `.tsx` for React components
- Use `.ts` for utilities and non-React code
- Follow Next.js App Router conventions

## Testing Guidelines
- Write tests alongside implementation (TDD)
- Test file naming: `*.test.ts` or `*.test.tsx`
- Focus on behavior, not implementation details
- Use React Testing Library best practices

## Git Workflow
- Run lint, test, and build before committing
- Setup pre-commit hooks for automated checks
- Use GitHub Actions for CI/CD

## Component Development
- Build reusable components
- Use Shadcn/ui components as base
- Follow accessibility best practices
- Keep components focused and single-purpose

## File Upload Feature
- Support Word (.docx) and Excel (.xlsx) files
- Parse file contents to extract data
- Map extracted data to form fields
- Provide clear error handling

## State Management
- Use React hooks for local state
- Consider Context API for shared state
- Keep state close to where it's used

## Important Notes
- This is a POC - focus on core functionality
- Prioritize file parsing and UI mapping
- Ensure good error handling for file uploads
- Make the auto-fill process transparent to users