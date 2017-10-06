#!/usr/bin/env sh

set -e

webpack --config build/webpack.test.run.js > /dev/null 2>&1
karma start test/integration/karma.run.js
