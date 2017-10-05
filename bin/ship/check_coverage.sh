#!/usr/bin/env sh

set -e

node node_modules/istanbul/lib/cli.js check-coverage test/unit/coverage/coverage.json --config test/unit/.istanbul.yml