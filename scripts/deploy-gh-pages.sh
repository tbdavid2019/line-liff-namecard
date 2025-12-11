#!/usr/bin/env bash
set -euo pipefail

# Deploy dist/ to gh-pages branch using git worktree.
# Prerequisites:
#   - .env 已設定 BASEURL/LIFFID_FULL/NODE_ENV=production
#   - 已執行過 git remote add origin <repo-url>
#   - 已安裝 pnpm

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_NAME="${REMOTE_NAME:-origin}"
BRANCH_NAME="${BRANCH_NAME:-gh-pages}"
WORKTREE_DIR="${WORKTREE_DIR:-$ROOT_DIR/.gh-pages-tmp}"

echo "==> Building site"
cd "$ROOT_DIR"
pnpm install
pnpm build

echo "==> Preparing worktree ($WORKTREE_DIR) for branch $BRANCH_NAME"
rm -rf "$WORKTREE_DIR"
git worktree add -B "$BRANCH_NAME" "$WORKTREE_DIR" "$REMOTE_NAME/$BRANCH_NAME" 2>/dev/null || \
  git worktree add -B "$BRANCH_NAME" "$WORKTREE_DIR"

echo "==> Syncing dist/ to worktree"
cd "$WORKTREE_DIR"
find . -mindepth 1 ! -name '.git' -exec rm -rf {} +
cp -R "$ROOT_DIR/dist"/. "$WORKTREE_DIR"/

echo "==> Commit and push"
git add .
git commit -m "Publish site" || echo "Nothing to commit"
git push "$REMOTE_NAME" "$BRANCH_NAME"

echo "Done. Ensure GitHub Pages is set to branch '$BRANCH_NAME' (root)."
