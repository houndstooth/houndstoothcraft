#!/bin/bash

webstorm .

DEV_SERVER_PORT=8080
KARMA_SERVER_PORT=9876

netstat -an | grep $DEV_SERVER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    npm start > /dev/null 2>&1 &

    sh ./bin/open_tabs.sh $DEV_SERVER_PORT $KARMA_SERVER_PORT
else
    printf "I think everything has already been started up.\n\n"
fi

netstat -an | grep $KARMA_SERVER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    npm run integration-test-server > /dev/null 2>&1 &
fi
