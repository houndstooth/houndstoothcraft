#!/bin/bash

DEV_SERVER_PORT=8080
KARMA_SERVER_PORT=8080

lsof -i:$DEV_SERVER_PORT > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    npm run integration-test-server > /dev/null 2>&1 &

    sh ./bin/open_tabs.sh $DEV_SERVER_PORT $KARMA_SERVER_PORT
else
    printf "I think everything has already been started up.\n\n"
fi

lsof -i:$KARMA_SERVER_PORT > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    npm start > /dev/null 2>&1 &
fi
