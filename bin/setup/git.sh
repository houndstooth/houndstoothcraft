#!/usr/bin/env sh

set -e

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git pull -r
