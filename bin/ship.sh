#!/bin/bash

set -e

npm update
./node_modules/.bin/eslint . --fix

git pull -r
git submodule foreach git pull -r

sh ./bin/ship/unit_tests_and_cover.sh
sh ./bin/ship/check_coverage.sh
sh ./bin/ship/integration_tests_and_fail_if_slow.sh

git submodule foreach git push
git push

sh ./bin/ship/deploy.sh