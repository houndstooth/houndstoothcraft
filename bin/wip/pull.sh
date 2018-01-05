#!/usr/bin/env sh

set -e

git pull origin wip -r
if [[ $(git log -1 --pretty=%B) == 'wip' ]] ; then
    git reset HEAD^

    git submodule foreach "
        git pull origin wip -r
        if [[ $(git log -1 --pretty=%B) == 'wip' ]] ; then
            git reset HEAD^
            git push origin --delete wip
        fi
    "

    git push origin --delete wip
fi
