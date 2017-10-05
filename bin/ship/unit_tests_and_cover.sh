#!/usr/bin/env sh

set -e

./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' node_modules/istanbul/lib/cli.js cover node_modules/jasmine/bin/jasmine.js --config test/unit/.istanbul.yml

sh ./bin/ship/inject_listener_into_coverage_page.sh