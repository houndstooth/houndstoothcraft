#!/usr/bin/env sh

set -e

function wip-pull-submodule {
    git pull origin wip -r
    if [[ "$(git log -1 --pretty=%B)" == 'wip' ]] ; then
        git reset HEAD^
        git push origin --delete wip
    fi
}

export -f wip-pull-submodule

git pull origin wip -r
if [[ $(git log -1 --pretty=%B) == 'wip' ]] ; then
    git reset HEAD^
    git submodule foreach wip-pull-submodule
    git push origin --delete wip
fi
