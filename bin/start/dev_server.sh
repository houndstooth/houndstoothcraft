#!/usr/bin/env sh

set -e

CMD="webpack-dev-server --config build/webpack.dev.js > /dev/null 2>&1 &"

sh ./bin/start/start_process_if_not_running.sh "$CMD" $DEV_SERVER_PORT "Dev server"
