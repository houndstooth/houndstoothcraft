#!/usr/bin/env sh

set -e

declare -a arr=(
    $DEV_SERVER_PORT
    $KARMA_SERVER_PORT
    $KARMA_WATCHER_PORT
    $ISTANBUL_WATCHER_PORT
)

for i in ${arr[@]} ; do
    sh ./bin/stop/kill_process_on_port.sh $i
done

pkill -f "webpack.test.server.js"

printf "Servers down.\n\n"
