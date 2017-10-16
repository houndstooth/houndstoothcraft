#!/usr/bin/env sh

set -e

CMD="node test/integration/autoRefresh/closeTabsWatcher.js > /dev/null 2>&1 &"

./bin/start/start_process_if_not_running.sh "$CMD" $CLOSE_TABS_WATCHER_PORT "Close tabs watcher"
