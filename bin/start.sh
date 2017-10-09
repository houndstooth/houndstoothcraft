#!/usr/bin/env sh

set -e


sh ./bin/start/close_tabs_watcher.sh
sh ./bin/start/integration_test_code_updates_watcher.sh
sh ./bin/start/integration_test_server.sh

sh ./bin/start/coverage_code_updates_watcher.sh
sh ./bin/start/coverage_report_server.sh

sh ./bin/start/dev_server.sh

sh ./bin/start/open_tabs.sh

sh ./bin/start/ide.sh

sh ./bin/start/refocus_terminal.sh

printf "${Green}IDE, servers, and browser tabs up.\n\n${NC}"
