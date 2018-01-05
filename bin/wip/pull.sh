#!/usr/bin/env sh

set -e

function wip_pull_submodule {
    git pull origin wip -r
    if [[ "$(git log -1 --pretty=%B)" == 'wip' ]] ; then
        git reset HEAD^
        git push origin --delete wip
    fi
}

export -f wip_pull_submodule

git pull origin wip -r
if [[ $(git log -1 --pretty=%B) == 'wip' ]] ; then
    git reset HEAD^
    git submodule foreach wip_pull_submodule
    git push origin --delete wip
fi
