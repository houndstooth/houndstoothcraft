#!/bin/bash

set -e

./node_modules/.bin/webpack --config build/webpack.test.run.js > /dev/null 2>&1
./node_modules/.bin/karma start test/integration/karma.run.js
