#!/bin/bash

if [[ $OSTYPE == darwin* ]] ; then
    lsof -ti:8080 | xargs kill && lsof -ti:9876 | xargs kill
else
    PORT_TO_KILL=$(netstat -aon | awk '/9879/ {print $5}')
    taskkill //pid $PORT_TO_KILL //f

    PORT_TO_KILL=$(netstat -aon | awk '/8080/ {print $5}')
    taskkill //pid $PORT_TO_KILL //f
fi
