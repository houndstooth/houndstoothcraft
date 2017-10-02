#!/bin/bash

CMD="node dev/watcher.js > /dev/null 2>&1 &"

sh ./bin/start/start_process_if_not_running.sh "$CMD" $WATCHER_PORT