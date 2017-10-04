#!/usr/bin/env sh

set -e

git pull -r
git submodule foreach git pull -r