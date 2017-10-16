#!/usr/bin/env sh

set -e

CMD="node test/unit/autoRefresh/coverageReportServer.js > /dev/null 2>&1 &"

./bin/start/start_process_if_not_running.sh "$CMD" $COVERAGE_REPORT_SERVER_PORT "Coverage report server"
