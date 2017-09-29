#!/bin/bash

if hash webstorm 2>/dev/null; then
    webstorm .
else
    start "" /c/Program\ Files\ \(x86\)/Sublime\ Text\ 3/subl.exe
fi

DEV_SERVER_PORT=8080
KARMA_SERVER_PORT=9876

netstat -an | grep $KARMA_SERVER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    npm run test-server > /dev/null 2>&1 &
fi

netstat -an | grep $DEV_SERVER_PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    if [[ $OSTYPE == darwin* ]] ; then
        open -na Google\ Chrome
    else
        start chrome
    fi
    sleep 1

    npm start > /dev/null 2>&1 &

    declare -a arr=(
        https://app.asana.com/0/358570257763740/list
        https://github.com/houndstooth/web-render
        http://localhost:$DEV_SERVER_PORT
        http://localhost:$KARMA_SERVER_PORT/debug.html
        ~/workspace/web-render/test/unit/coverage/lcov-report/index.html
        https://houndstooth.cfapps.io
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

    printf "IDE, servers, and browser tabs up.\n\n"
else
    printf "I think everything has already been started up.\n\n"
fi

if [[ $OSTYPE == darwin* ]] ; then
    open -a iTerm
fi
