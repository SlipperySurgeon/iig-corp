#!/bin/bash

# IIG Web Publishing Script
# Builds locally as a guard, then commits and pushes — Vercel auto-deploys on push to main.

set -e

cd "$(dirname "$0")/.."

echo "🚀 Publishing IIG Marketing Website..."

# Check for uncommitted changes
if [[ -z $(git status -s) ]]; then
    echo "✨ No changes to commit"
    exit 0
fi

# Show what will be committed
echo ""
echo "📝 Changes to be committed:"
git status --short
echo ""

# Local build guard — fail fast before pushing broken code
echo "🔧 Building locally to catch type/import errors..."
if ! npm run build > /tmp/iig-publish-build.log 2>&1; then
    echo "❌ Build failed — not publishing. Last 30 lines:"
    tail -30 /tmp/iig-publish-build.log
    exit 1
fi
echo "✅ Build OK"
echo ""

# Add all changes
echo "📦 Staging changes..."
git add -A

# Get commit message from user or use default
if [ -z "$1" ]; then
    commit_msg="Update website $(date '+%Y-%m-%d %H:%M')"
else
    commit_msg="$1"
fi

# Commit
echo "💾 Committing changes..."
git commit -m "$commit_msg

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

if [ $? -ne 0 ]; then
    echo "❌ Commit failed"
    exit 1
fi

# Get current branch
current_branch=$(git branch --show-current)

# Push to origin
echo "📤 Pushing to origin/$current_branch..."
git push origin $current_branch

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully published to git!"
    echo "🌐 Vercel deployment triggered for branch: $current_branch"
    echo ""
    echo "📍 Once deployed, your site will be available at:"
    echo "   - Production: https://iig-corp.com"
    echo "   - Vercel:     https://iig-corp.vercel.app"
    echo ""
    echo "Monitor deployment: https://vercel.com/dashboard"
else
    echo "❌ Push failed"
    exit 1
fi
