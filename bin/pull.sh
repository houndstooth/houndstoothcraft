#!/usr/bin/env sh

set -e

git pull -r
npm i
git submodule foreach git pull -r
