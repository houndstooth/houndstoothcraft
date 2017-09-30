#!/bin/bash

set -e

npm update
npm run lint-fix

git pull -r
git submodule foreach git pull -r

npm run cover
npm run check-coverage

sh ./bin/ship/fail_if_slow_tests.sh

git submodule foreach git push
git push

sh ./bin/ship/deploy.sh