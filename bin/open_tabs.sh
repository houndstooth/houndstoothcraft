#!/bin/bash

DEV_SERVER_PORT=$1
KARMA_SERVER_PORT=$2

declare -a arr=(
    https://app.asana.com/0/358570257763740/314008242914015
    http://localhost:$DEV_SERVER_PORT
    http://localhost:$KARMA_SERVER_PORT/debug.html
    ~/workspace/web-render/test/unit/coverage/lcov-report/index.html
)

if [[ $OSTYPE == darwin* ]] ; then
    for i in "${arr[@]}" ; do
       open "$i"
    done
else
    for i in "${arr[@]}" ; do
       start chrome "$i"
    done
fi
