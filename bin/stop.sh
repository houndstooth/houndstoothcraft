#!/usr/bin/env sh

set -e

# this file is watched by a server which sends an event to the main tab to trigger it to close the others
mkdir -p ./test/integration/dist
touch ./test/integration/dist/close
cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1 > ./test/integration/dist/close

if [[ $OSTYPE == darwin* ]] ; then
    declare -a arr=(
        $DEV_SERVER_PORT
        $INTEGRATION_TEST_SERVER_PORT
        $INTEGRATION_TEST_CODE_UPDATES_WATCHER_PORT
        $COVERAGE_CODE_UPDATES_WATCHER_PORT
        $COVERAGE_REPORT_SERVER_PORT
        $CLOSE_TABS_WATCHER_PORT
    )

    for i in ${arr[@]} ; do
        ./bin/stop/kill_process_on_port.sh $i
    done

    pkill -f "webpack.test.server.js" || true
else
    taskkill //f //im node.exe
fi

printf "${Purple}Servers down and tabs closed.${NC}\n"
