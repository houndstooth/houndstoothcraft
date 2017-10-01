#!/bin/bash

sh ./bin/start/ide.sh

DEV_SERVER_PORT=8080
KARMA_SERVER_PORT=9876
WATCHER_PORT=6789
KARMA_WATCHER_PORT=1234

sh ./bin/start/watcher.sh $WATCHER_PORT
sh ./bin/start/karma_watcher.sh $KARMA_WATCHER_PORT
sh ./bin/start/test_server.sh $KARMA_SERVER_PORT

CMD="./node_modules/.bin/webpack --config build/webpack.dev.js > /dev/null 2>&1 &node dev/server.js > /dev/null 2>&1 &sh ./bin/start/open_tabs.sh $DEV_SERVER_PORT $KARMA_SERVER_PORT"
sh ./bin/start/start_process_if_not_running.sh "$CMD" $DEV_SERVER_PORT

sh ./bin/start/refocus_terminal.sh

printf "IDE, servers, and browser tabs up.\n\n"