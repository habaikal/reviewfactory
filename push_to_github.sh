#!/bin/bash
set -e
USERNAME=${1:-""}
REPO_NAME=${2:-"reviewfactory-os-v2"}
if [ -z "$USERNAME" ]; then echo "Usage: ./push_to_github.sh <username> [repo]"; exit 1; fi
git init; git branch -M main || true
git add .; git commit -m "feat: v2.0 factory" || true
git remote remove origin 2>/dev/null || true
if [ -n "$GITHUB_TOKEN" ]; then
  git remote add origin https://${GITHUB_TOKEN}@github.com/${USERNAME}/${REPO_NAME}.git
  gh repo create ${USERNAME}/${REPO_NAME} --public --source=. --remote=origin --push || git push -u origin main --force
else
  echo "Create repo https://github.com/new ${REPO_NAME} then git push"
  git remote add origin https://github.com/${USERNAME}/${REPO_NAME}.git
  git push -u origin main
fi
