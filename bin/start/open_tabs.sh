#!/usr/bin/env sh

set -e

if [[ $OSTYPE == darwin* ]] ; then
    open -na "Google Chrome" --args --auto-open-devtools-for-tabs
else
    start chrome --args --auto-open-devtools-for-tabs
fi
sleep 1

declare -a arr=(
    "http://localhost:$DEV_SERVER_PORT"
    "http://localhost:$KARMA_SERVER_PORT/debug.html"
)

if [[ $OSTYPE == darwin* ]] ; then
    for i in ${arr[@]} ; do
       open "$i"
    done
else
    for i in ${arr[@]} ; do
       start chrome "$i"
    done
fi

if [[ $OSTYPE == darwin* ]] ; then
    open -a "Google Chrome"
else
    echo ""
fi
sleep 1

declare -a arr=(
    "https://app.asana.com/0/358570257763740/list"
    "https://github.com/houndstooth/web-render"
    "~/workspace/web-render/test/unit/coverage/lcov-report/index.html"
    "https://houndstooth.cfapps.io"
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
