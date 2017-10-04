#!/usr/bin/env sh

set -e

sh ./bin/ship/unit_tests_and_cover.sh > /dev/null 2>&1

node test/unit/watcher.js > /dev/null 2>&1 &
