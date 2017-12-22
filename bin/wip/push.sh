#!/usr/bin/env sh

set -e

git submodule foreach git checkout -b wip
git submodule foreach git add .
git submodule foreach git commit -m "wip"
git submodule foreach git push -u origin wip
git submodule foreach checkout master
git submodule foreach branch -D wip

git checkout -b wip
git add .
git commit -m "wip"
git push -u origin wip
git checkout master
git branch -D wip
