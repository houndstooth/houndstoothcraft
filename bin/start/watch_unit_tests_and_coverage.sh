#!/usr/bin/env sh

set -e

sh ./bin/test/unit_tests_and_cover.sh > /dev/null 2>&1

node test/unit/autoRefresh/watcher.js > /dev/null 2>&1 &
