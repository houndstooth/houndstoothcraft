#!/usr/bin/env sh

set -e

./bin/test/unit.sh
./bin/test/integration.sh

codecov -f test/unit/coverage/coverage-final.json
