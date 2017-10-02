#!/bin/bash

set -e

npm update
./node_modules/.bin/eslint . --fix

sh ./bin/pull.sh

sh ./bin/ship/unit_tests_and_cover.sh
sh ./bin/ship/check_coverage.sh
sh ./bin/ship/integration_tests_and_fail_if_slow.sh

sh ./bin/push.sh

sh ./bin/ship/deploy.sh