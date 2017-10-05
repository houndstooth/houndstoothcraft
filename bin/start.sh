#!/usr/bin/env sh

set -e

sh ./bin/start/watch_unit_tests_and_coverage.sh
sh ./bin/start/karma_watcher.sh
sh ./bin/start/test_server.sh

sh ./bin/start/dev_server_and_tabs.sh

sh ./bin/start/ide.sh

sh ./bin/start/refocus_terminal.sh

printf "IDE, servers, and browser tabs up.\n\n"