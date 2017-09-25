#!/bin/bash

if [[ $OSTYPE == darwin* ]] ; then
    lsof -ti:9876 -sTCP:LISTEN | xargs kill
    lsof -ti:8080 -sTCP:LISTEN | xargs kill
else
    netstat -an | grep 9876 | grep LISTEN > /dev/null 2>&1
    if [[ $? -ne 1 ]] ; then
        PID_TO_KILL=$(netstat -aon | grep LISTEN | awk '/9876/ {print $5}')
        taskkill //pid $PID_TO_KILL //f
    fi

    netstat -an | grep 8080 | grep LISTEN > /dev/null 2>&1
    if [[ $? -ne 1 ]] ; then
        PID_TO_KILL=$(netstat -aon | grep LISTEN | awk '/8080/ {print $5}')
        taskkill //pid $PID_TO_KILL //f
    fi
fi

printf "Servers down.\n\n"
