#!/bin/bash

set -e

npm update
./node_modules/.bin/eslint . --fix

git pull -r
git submodule foreach git pull -r

sh ./bin/ship/cover.sh
sh ./bin/ship/check_coverage.sh
sh ./bin/ship/fail_if_slow_tests.sh

git submodule foreach git push
git push

sh ./bin/ship/deploy.sh