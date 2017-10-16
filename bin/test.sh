#!/usr/bin/env sh

set -e

./bin/shared/cmd_w_msgs.sh "./bin/test/unit.sh" "running unit tests" "Unit tests failed!" "Unit tests passed."
./bin/shared/cmd_w_msgs.sh "./bin/test/integration.sh" "running integration tests" "Integration tests failed!" "Integration tests passed."
