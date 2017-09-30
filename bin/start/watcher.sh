#!/bin/bash

WATCHER_PORT=$1

netstat -an | grep $KARMA_SERVER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    node dev/watcher.js > /dev/null 2>&1 &
fi
