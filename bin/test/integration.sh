#!/usr/bin/env sh

set -e

webpack --config build/webpack.test.js
karma start test/integration/karma.run.js
