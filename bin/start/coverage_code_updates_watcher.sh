#!/usr/bin/env sh

set -e

CMD="node test/unit/autoRefresh/coverageCodeUpdatesWatcher.js > /dev/null 2>&1 &"

./bin/start/start_process_if_not_running.sh "$CMD" $COVERAGE_CODE_UPDATES_WATCHER_PORT "Coverage code updates watcher"
