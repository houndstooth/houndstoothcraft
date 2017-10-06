#!/usr/bin/env sh

set -e

sh ./bin/test.sh
codecov -f test/unit/coverage/coverage-final.json
