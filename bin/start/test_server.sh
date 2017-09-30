#!/bin/bash

KARMA_SERVER_PORT=$1

netstat -an | grep $KARMA_SERVER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    ./node_modules/.bin/webpack --config build/webpack.test.server.js > /dev/null 2>&1 &
    ./node_modules/.bin/karma start test/integration/karma.server.js > /dev/null 2>&1 &
fi
