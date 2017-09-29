#!/bin/bash

set -e

sh ./bin/setup/install.sh

npm i

sh ./bin/setup/git.sh

sh ./bin/setup/coverage.sh

sh ./bin/start.sh

printf "Welcome to your fresh workstation. Enjoy developing some more houndstooth.\n\n"
