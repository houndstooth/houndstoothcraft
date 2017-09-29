#!/bin/bash

sh ./bin/start/ide.sh

DEV_SERVER_PORT=8080
KARMA_SERVER_PORT=9876

sh ./bin/start/test_server.sh $KARMA_SERVER_PORT

netstat -an | grep $DEV_SERVER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    npm start > /dev/null 2>&1 &

    sh ./bin/start/open_tabs.sh $DEV_SERVER_PORT $KARMA_SERVER_PORT

    printf "IDE, servers, and browser tabs up.\n\n"
else
    printf "I think everything has already been started up.\n\n"
fi

sh ./bin/start/refocus_terminal.sh
