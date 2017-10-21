#!/usr/bin/env sh

set -e

./bin/shared/cmd_w_msgs.sh "npm i -g npm" "upgrading npm" "npm upgrade failed." "npm at latest."
./bin/shared/cmd_w_msgs.sh "npm update" "updating dependencies" "npm update failed." "All dependencies at latest."

./bin/shared/cmd_w_msgs.sh "tslint '**/*.ts' -e **/node_modules/** --fix --project tsconfig.json" "linting" "Linting errors detected." "Lint-free."

./bin/shared/cmd_w_msgs.sh "./bin/pull.sh" "pulling" "Your working tree is unclean, or you haven't loaded your SSH key." "Latest code pulled."

./bin/shared/cmd_w_msgs.sh "./bin/test/unit_tests_and_cover.sh" "running unit tests and covering" "Unit tests failed!" "Unit tests passed and coverage report updated."
./bin/shared/cmd_w_msgs.sh "git add test/unit/coverage/coverage-final.json && git commit --amend --no-edit" "amending commit with updated coverage report" "Something went wrong adding the coverage report changes to the commit." "Coverage report changes added to commit."

./bin/shared/cmd_w_msgs.sh "./bin/test/integration_tests_and_fail_if_slow.sh" "running integration tests and checking for slow tests" "Integration tests failed, or ran too slow!" "Integration tests passed."

./bin/shared/cmd_w_msgs.sh "./bin/push.sh" "pushing" "Push failed." "Your commits have been pushed to the Github remote."

./bin/shared/cmd_w_msgs.sh "./bin/ship/build.sh" "building" "Something went wrong building the production bundle." "Production app bundled."

./bin/shared/cmd_w_msgs.sh "./bin/ship/deploy.sh" "deploying" "Did not deploy to production environment." "Deployed!"
