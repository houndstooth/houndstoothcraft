#!/usr/bin/env sh

set -e

git submodule foreach git push
git push