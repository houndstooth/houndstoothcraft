#!/bin/bash

KARMA_SERVER_PORT=$1

netstat -an | grep $KARMA_SERVER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    npm run test-server > /dev/null 2>&1 &
fi

node test/integration/watcher.js > /dev/null 2>&1 &