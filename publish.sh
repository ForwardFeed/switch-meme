#!/bin/env bash

#exit at failure
set -e

git checkout github-pages

git merge --no-ff -m "updated github pages"
git push

git checkout main