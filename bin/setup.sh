#!/usr/bin/env sh

set -e

npm i -g npm

sh ./bin/setup/install.sh

npm i

sh ./bin/setup/git.sh

sh ./bin/start.sh

printf "${Green}Welcome to your fresh workstation. Enjoy developing some more houndstooth.\n\n${NC}"
