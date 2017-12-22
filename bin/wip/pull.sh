#!/usr/bin/env sh

set -e

git pull origin wip
git reset HEAD^
git push origin --delete wip

git submodule foreach git pull origin wip
git submodule foreach git reset HEAD^
git submodule foreach git push origin --delete wip
