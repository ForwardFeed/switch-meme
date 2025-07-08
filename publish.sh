#!/bin/env bash

#exit at failure
set -e

# first check if you haven't forgotten to push something to remote
# it has to work this way because else things gets overwritten pain xd

git checkout github-pages

bun run build-only

git add .
git commit -m "updated build"

git merge main -m "merged from main branch" --no-ff 
git push

git checkout main