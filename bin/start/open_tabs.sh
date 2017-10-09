#!/usr/bin/env sh

set -e

INTEGRATION_TEST_SERVER_URL=http://localhost:$INTEGRATION_TEST_SERVER_PORT/debug.html

if [[ $OSTYPE == darwin* ]] ; then
    open $INTEGRATION_TEST_SERVER_URL
else
    start chrome $INTEGRATION_TEST_SERVER_URL
fi
