#!/usr/bin/env sh

set -e

npm i -g npm
npm update

eslint '**/*.ts' --fix
tslint '**/*.ts' -e **/node_modules/** --fix --type-check --project tsconfig.json

sh ./bin/pull.sh

sh ./bin/test/unit_tests_and_cover.sh
git add test/unit/coverage/coverage-final.json
git commit --amend --no-edit
sh ./bin/test/integration_tests_and_fail_if_slow.sh

sh ./bin/push.sh

sh ./bin/ship/build.sh

sh ./bin/ship/deploy.sh
