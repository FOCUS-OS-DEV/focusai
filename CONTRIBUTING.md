# Contributing to FocusAI

## Workflow

### 1. Create Issue First
Before starting work, create an issue:
```bash
gh issue create --title "[Feature]: Title" --body "Description"
```

### 2. Create Branch
```bash
git checkout main
git pull origin main
git checkout -b <type>/<short-description>
```

Branch naming:
- `feat/` - new features
- `fix/` - bug fixes
- `refactor/` - code refactoring
- `docs/` - documentation

### 3. Work on Branch
Make commits following conventional commits:
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login redirect issue"
git commit -m "refactor: simplify API handlers"
```

### 4. Before Committing
- [ ] Run tests: `npm test`
- [ ] Run build: `npm run build`
- [ ] Self-review your changes
- [ ] Get human approval (when working with AI)

### 5. Create Pull Request
```bash
git push -u origin <branch-name>
gh pr create --title "feat: description" --body "Fixes #123"
```

### 6. After Merge
```bash
git checkout main
git pull origin main
gh issue close <number>  # If not auto-closed
git branch -d <branch-name>
git push origin --delete <branch-name>
```

## Commit Message Format

```
<type>: <short description>

[optional body]

[optional footer]
```

Types:
- `feat` - new feature
- `fix` - bug fix
- `refactor` - code change (no feature/fix)
- `docs` - documentation
- `style` - formatting
- `test` - tests
- `chore` - maintenance

## QA Checklist

Before PR:
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive design checked
- [ ] Edge cases handled

After Merge:
- [ ] Verify on main branch
- [ ] Test in staging (if available)
