#!/usr/bin/env sh

git submodule foreach "
    git checkout -b wip
    git add .
    git commit -m 'wip'
    git push origin wip
    git checkout master
    git branch -D wip
"

git checkout -b wip
git add .
git commit -m 'wip'
git push origin wip
git checkout master
git branch -D wip
