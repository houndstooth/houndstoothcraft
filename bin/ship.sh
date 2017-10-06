#!/usr/bin/env sh

set -e

npm i -g npm
npm update
eslint '**/*.ts' --fix

sh ./bin/pull.sh

sh ./bin/test/unit_tests_and_cover.sh
sh ./bin/test/integration_tests_and_fail_if_slow.sh

sh ./bin/push.sh

sh ./bin/ship/build.sh

sh ./bin/ship/deploy.sh
