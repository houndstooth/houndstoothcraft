#!/bin/bash

KARMA_SERVER_PORT=$1

CMD="./node_modules/.bin/webpack --config build/webpack.test.server.js > /dev/null 2>&1 &./node_modules/.bin/karma start test/integration/karma.server.js > /dev/null 2>&1 &"

sh ./bin/start/start_process_if_not_running.sh "$CMD" $KARMA_SERVER_PORT