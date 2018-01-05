#!/usr/bin/env sh

function wip_push {
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

export -f wip_push

git submodule foreach wip_push
wip-push
