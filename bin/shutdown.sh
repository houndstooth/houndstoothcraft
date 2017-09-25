#!/bin/bash

if [[ $OSTYPE == darwin* ]] ; then
    lsof -ti:8080 -sTCP:LISTEN | xargs kill
    lsof -ti:9876 -sTCP:LISTEN | xargs kill
else
    PID_TO_KILL=$(netstat -aon | awk '/9879/ {print $5}')
    taskkill //pid $PID_TO_KILL //f

    PID_TO_KILL=$(netstat -aon | awk '/8080/ {print $5}')
    taskkill //pid $PID_TO_KILL //f
fi
