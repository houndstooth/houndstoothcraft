#!/usr/bin/env sh

set -e

./node_modules/.bin/webpack --config build/webpack.prod.js
