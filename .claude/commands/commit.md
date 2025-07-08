# Smart Commit

Review all code changes and create organized commits grouped by their purpose.

## Steps

1. Run `git status` to see all changed files
2. Run `git diff` to review all unstaged changes
3. Run `git diff --cached` to review staged changes
4. Analyze the changes and group them by:
   - Feature additions
   - Bug fixes
   - Refactoring
   - Documentation updates
   - Configuration changes
   - Test additions/updates
   - Style/formatting changes
5. Create separate commits for each logical group of changes
6. Use descriptive commit messages following conventional commits format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for code refactoring
   - `docs:` for documentation
   - `test:` for test changes
   - `chore:` for maintenance tasks
   - `style:` for formatting changes
7. Stage and commit each group separately
8. Show a summary of created commits

## Example Usage

If there are changes to:
- New modal component files
- Updated tests
- Modified configuration

Create commits like:
```
feat: add modal component for file upload
test: add tests for modal component
chore: update eslint configuration
```

## Notes

- Don't mix different types of changes in one commit
- Each commit should be atomic and focused
- Provide clear commit messages that explain the "why"
- If changes are related but span multiple files, keep them in the same commit
- Review each commit before finalizing