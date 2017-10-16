#!/usr/bin/env sh

set -e

./bin/test/run_command_with_custom_failure_message.sh "./bin/test/unit.sh" "Unit tests failed!"
./bin/test/run_command_with_custom_failure_message.sh "./bin/test/integration.sh" "Integration tests failed!"
