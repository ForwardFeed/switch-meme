#!/bin/env bash

#exit at failure
set -e

git checkout github-pages
git merge main

git add .
git commit -m "updated github pages"
git push

git checkout main