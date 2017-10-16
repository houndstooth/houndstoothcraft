#!/usr/bin/env sh

set -e

CMD="webpack --config build/webpack.test.server.js > /dev/null 2>&1 &karma start test/integration/karma.server.js > /dev/null 2>&1 &"

./bin/start/start_process_if_not_running.sh "$CMD" $INTEGRATION_TEST_SERVER_PORT "Integration test server"
