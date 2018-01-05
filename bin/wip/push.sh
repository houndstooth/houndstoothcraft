#!/usr/bin/env sh

git submodule foreach "
    git branch -D wip
    git checkout -b wip
    git add .
    git commit -m 'wip'
    if [[ "$(git log -1 --pretty=%B)" == 'wip' ]] ; then
        git push origin wip
    fi
    git checkout master
    git branch -D wip
"

git branch -D wip
git checkout -b wip
git add .
git commit -m 'wip'
if [[ "$(git log -1 --pretty=%B)" == 'wip' ]] ; then
    git push origin wip
fi
git checkout master
git branch -D wip
