#!/usr/bin/env sh

set -e

CMD="./node_modules/.bin/webpack-dev-server --config build/webpack.dev.js > /dev/null 2>&1 &sh ./bin/start/open_tabs.sh"

sh ./bin/start/start_process_if_not_running.sh "$CMD" $DEV_SERVER_PORT "Dev server"