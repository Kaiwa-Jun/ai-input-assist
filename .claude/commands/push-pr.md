# Push and Create PR

Push the current branch to remote and create a pull request.

## Steps

1. Check current branch and ensure it's not main/master
2. Check if there are any unpushed commits
3. Push the current branch to remote (create upstream if needed)
4. Create a pull request using GitHub CLI
5. Set appropriate PR title based on commits
6. Generate PR description summarizing the changes
7. Return the PR URL

## Pre-requisites

- GitHub CLI (`gh`) must be installed and authenticated
- Current branch should have commits to push
- Should not be on main/master branch

## Process

1. Verify we're not on the default branch
2. Check remote tracking and push status
3. Push changes with `-u` flag if no upstream
4. Create PR with:
   - Title summarizing the changes
   - Description listing key changes
   - Appropriate labels if applicable

## Example Usage

After making commits:
```
/push-pr
```

This will:
- Push all local commits to remote
- Create a PR from current branch to main
- Provide the PR URL for review

## Notes

- Automatically sets upstream tracking if not exists
- Uses conventional commit format for PR title
- Includes commit summary in PR description
- Handles both new branches and existing ones