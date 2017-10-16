#!/usr/bin/env sh

set -e

npm i -g npm
npm update

tslint '**/*.ts' -e **/node_modules/** --fix --type-check --project tsconfig.json

./bin/pull.sh

./bin/test/unit_tests_and_cover.sh
git add test/unit/coverage/coverage-final.json
git commit --amend --no-edit
./bin/test/integration_tests_and_fail_if_slow.sh

./bin/push.sh

./bin/ship/build.sh

./bin/ship/deploy.sh
