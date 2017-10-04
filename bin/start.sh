#!/usr/bin/env sh

set -e

sh ./bin/start/watch_unit_tests_and_coverage.sh
sh ./bin/start/karma_watcher.sh
sh ./bin/start/test_server.sh

CMD="./node_modules/.bin/webpack-dev-server --config build/webpack.dev.js > /dev/null 2>&1 &sh ./bin/start/open_tabs.sh"
sh ./bin/start/start_process_if_not_running.sh "$CMD" $DEV_SERVER_PORT

sh ./bin/start/ide.sh

sh ./bin/start/refocus_terminal.sh

printf "IDE, servers, and browser tabs up.\n\n"