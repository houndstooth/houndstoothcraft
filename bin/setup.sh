#!/usr/bin/env sh

set -e

git submodule foreach git checkout main

./bin/setup/profile.sh

./bin/setup/install.sh

./bin/shared/cmd_w_msgs.sh "npm i --force" "updating dependencies" "npm install failed." "All dependencies at latest."

./bin/setup/git.sh

./bin/start.sh

printf "${Green}Welcome to your fresh workstation. Enjoy developing some more houndstooth.\n\n${NC}"
