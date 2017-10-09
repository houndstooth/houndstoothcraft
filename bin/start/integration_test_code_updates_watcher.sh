#!/usr/bin/env sh

set -e

CMD="node test/integration/autoRefresh/integrationTestCodeUpdatesWatcher.js > /dev/null 2>&1 &"

sh ./bin/start/start_process_if_not_running.sh "$CMD" $INTEGRATION_TEST_CODE_UPDATES_WATCHER_PORT "Integration test code updates watcher"
