#!/usr/bin/env sh

set -e

CMD="node test/integration/autoRefresh/watcher.js > /dev/null 2>&1 &"

sh ./bin/start/start_process_if_not_running.sh "$CMD" $KARMA_WATCHER_PORT