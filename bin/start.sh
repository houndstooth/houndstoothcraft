#!/bin/bash

sh ./bin/start/ide.sh

sh ./bin/ship/unit_tests_and_cover.sh

sh ./bin/start/watcher.sh
sh ./bin/start/karma_watcher.sh
sh ./bin/start/test_server.sh

CMD="./node_modules/.bin/webpack --config build/webpack.dev.js > /dev/null 2>&1 &node dev/server.js > /dev/null 2>&1 &sh ./bin/start/open_tabs.sh"
sh ./bin/start/start_process_if_not_running.sh "$CMD" $DEV_SERVER_PORT

sh ./bin/start/refocus_terminal.sh

printf "IDE, servers, and browser tabs up.\n\n"