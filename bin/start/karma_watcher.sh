#!/bin/bash

KARMA_WATCHER_PORT=$1

netstat -an | grep $KARMA_WATCHER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    node test/integration/autoRefresh/watcher.js > /dev/null 2>&1 &
fi
