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
- mammoth.js for Word file parsing
- xlsx for Excel file parsing
- External AI API for text analysis (OpenAI/Claude/etc.)
- No database - Stateless file processing only

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
- Manage upload progress and processing status in component state
- Keep form data state close to the form component
- No persistent state required (stateless application)

## System Architecture

### Data Flow Overview

1. **Client Side (Browser)**
   - File selection/drop → File validation → Send file via FormData
   - Receive parsed results → Auto-populate form fields

2. **Server Side (Next.js API Route)**
   - Receive file → Determine file format
   - Parse Word (mammoth.js) or Excel (xlsx) → Extract text
   - Call AI API with extracted text → Parse response
   - Return structured data

3. **External AI API**
   - Process prompt + extracted text
   - Natural language processing
   - Return structured JSON response

### Implementation Flow

```
Client                      Server                      AI API
  |                           |                           |
  |-- POST file ----------->  |                           |
  |                           |-- Parse file content      |
  |                           |                           |
  |                           |-- Send to AI API ------> |
  |                           |                           |
  |                           |<- Return JSON data ------ |
  |                           |                           |
  |<- Return parsed data ---  |                           |
  |                           |                           |
  |-- Auto-fill form          |                           |
```

### API Route Structure

- `/api/parse-document` - Main endpoint for file upload and processing
  - Accepts: multipart/form-data with Word/Excel files
  - Returns: JSON with extracted and structured data

### Error Handling

- Client: File type validation, size limits, upload progress
- Server: File parsing errors, AI API failures, timeout handling
- UI: Clear error messages, retry mechanisms

## Next.js Implementation Guidelines

### Routing Best Practices

- **Route Groups**: Do NOT treat route groups like `/(admin)/page.tsx` as nested routing
  - Route groups are NOT recognized in routing paths
  - `/(admin)/page.tsx` conflicts with root `/page.tsx` and causes errors
  - Use route groups only for organization, not for routing logic

### Data Processing Best Practices

- **Avoid useEffect() for data operations**
  - Best practice: Use Server Components for file processing
  - Handle file parsing in API routes
  - Process files server-side before sending to client

### Streaming and Loading States

- **Use Streaming Data Fetching with Suspense**
  - Implement skeleton loading for each component during data fetch
  - Wrap components with Suspense boundaries
  - Example: `<Suspense fallback={<Skeleton />}><Component /></Suspense>`

### Form Handling and Mutations

- **Prefer Server Actions over event handlers**
  - Always implement forms with Server Actions when possible
  - Use `"use server"` directive for server-side form handling
  - Avoid client-side event handlers for form submissions

### Dynamic Routes and Search Params

- **Always access params asynchronously**
  - useSearchParams and dynamic route params require async/await
  - Example: `const params = await useSearchParams()`
  - Dynamic routes: `const { id } = await params` in dynamic routes

## Important Notes

- This is a POC - focus on core functionality
- **No database required** - All processing is stateless
- Prioritize file parsing and UI mapping
- Ensure good error handling for file uploads
- Make the auto-fill process transparent to users
- Implement proper loading states during processing
- Consider rate limiting for AI API calls
- Files are processed in-memory and not stored

## PR Review Guidelines

When reviewing pull requests, Claude should focus on:

### Code Quality

- TypeScript type safety and proper type annotations
- React best practices and hooks usage
- Next.js 15 App Router conventions
- Proper error handling and edge cases
- Performance optimizations

### Security

- No hardcoded secrets or API keys
- Proper input validation
- Safe file handling practices
- XSS and injection prevention

### Testing

- Test coverage for new features
- TDD principles adherence
- React Testing Library best practices
- Edge case testing

### Architecture

- Component reusability
- State management efficiency
- API route design
- File processing optimization

### UI/UX

- Accessibility compliance
- Loading states and error feedback
- Responsive design
- Shadcn/ui component usage

### Documentation

- Clear code comments where necessary
- Updated README if needed
- API documentation for new endpoints
