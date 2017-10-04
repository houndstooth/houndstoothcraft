#!/usr/bin/env sh

set -e

./node_modules/.bin/babel-node node_modules/babel-istanbul/lib/cli.js check-coverage test/unit/coverage/coverage.json --config test/unit/.istanbul.yml