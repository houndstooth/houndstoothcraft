#!/usr/bin/env sh

set -e

./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' node_modules/jasmine/bin/jasmine.js