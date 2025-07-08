#!/bin/env bash

#exit at failure
set -e

git checkout github-pages
git rebase main

bun run build-only

git add .
git commit -m "updated build"
git push

git checkout main