#!/usr/bin/env sh

set -e


./bin/start/close_tabs_watcher.sh
./bin/start/integration_test_code_updates_watcher.sh
./bin/start/integration_test_server.sh

./bin/start/coverage_code_updates_watcher.sh
./bin/start/coverage_report_server.sh

./bin/start/dev_server.sh

./bin/start/open_tabs.sh

./bin/start/ide.sh

./bin/start/refocus_terminal.sh

printf "${Green}IDE, servers, and browser tabs up.${NC}\n"
