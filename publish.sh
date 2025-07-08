#!/bin/env bash

#exit at failure
set -e

git checkout github-pages

bun run build-only

git merge main -m "merged from main branch" --no-ff 
git push

git checkout main