#!/usr/bin/env sh

set -e

./node_modules/.bin/nyc node_modules/jasmine/bin/jasmine.js

sh ./bin/test/inject_listener_into_coverage_page.sh