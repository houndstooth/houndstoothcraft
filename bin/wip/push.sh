#!/usr/bin/env sh

function wip-push {
    git branch -D wip
    git checkout -b wip
    git add .
    git commit -m 'wip'
    if [[ "$(git log -1 --pretty=%B)" == 'wip' ]] ; then
        git push origin wip
    fi
    git checkout master
    git branch -D wip
}

export -f wip-push

git submodule foreach wip-push
wip-push
