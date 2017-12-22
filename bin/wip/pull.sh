#!/usr/bin/env sh

set -e

git pull origin wip -r
git reset HEAD^
git push origin --delete wip

git submodule foreach git pull origin wip -r
git submodule foreach git reset HEAD^
git submodule foreach git push origin --delete wip
