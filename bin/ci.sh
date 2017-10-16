#!/usr/bin/env sh

set -e

./bin/test.sh
codecov -f test/unit/coverage/coverage-final.json
