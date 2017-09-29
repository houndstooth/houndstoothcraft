#!/bin/bash

DEV_SERVER_PORT=8080
KARMA_SERVER_PORT=9876

if [[ $OSTYPE == darwin* ]] ; then
    lsof -ti:$KARMA_SERVER_PORT -sTCP:LISTEN | xargs kill
    lsof -ti:$DEV_SERVER_PORT -sTCP:LISTEN | xargs kill
else
    netstat -an | grep $KARMA_SERVER_PORT | grep LISTEN > /dev/null 2>&1
    if [[ $? -ne 1 ]] ; then
        PID_TO_KILL=$(netstat -aon | grep $KARMA_SERVER_PORT | grep LISTEN | awk '{print $5}')
        taskkill //pid $PID_TO_KILL //f
    fi

    netstat -an | grep $DEV_SERVER_PORT | grep LISTEN > /dev/null 2>&1
    if [[ $? -ne 1 ]] ; then
        PID_TO_KILL=$(netstat -aon | grep $DEV_SERVER_PORT | grep LISTEN | awk '{print $5}')
        taskkill //pid $PID_TO_KILL //f
    fi
fi

printf "Servers down.\n\n"
