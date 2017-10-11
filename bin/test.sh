#!/usr/bin/env sh

set -e

sh ./bin/test/run_command_with_custom_failure_message.sh "./bin/test/unit.sh" "Unit tests failed!"
sh ./bin/test/run_command_with_custom_failure_message.sh "./bin/test/integration.sh" "Integration tests failed!"
