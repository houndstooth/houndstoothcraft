#!/bin/bash

DEV_SERVER_PORT=8080
lsof -i:${DEV_SERVER_PORT} > /dev/null 2>&1
if [ $? -ne 0 ]; then
    npm run integration-test-server > /dev/null 2>&1 &

    open https://app.asana.com/0/358570257763740/314008242914015
    open http://localhost:${DEV_SERVER_PORT}
    open http://localhost:${KARMA_SERVER_PORT}/debug.html
    open ~/workspace/web-render/coverage/lcov-report/index.html
else
    printf "I think everything has already been started up.\n\n"
fi

KARMA_SERVER_PORT=8080
lsof -i:${KARMA_SERVER_PORT} > /dev/null 2>&1
if [ $? -ne 0 ]; then
    npm start > /dev/null 2>&1 &
fi
