#!/usr/bin/env sh

set -e

./bin/setup/profile.sh

./bin/shared/cmd_w_msgs.sh "npm i -g npm" "upgrading npm" "npm upgrade failed." "npm at latest."

./bin/setup/install.sh

./bin/shared/cmd_w_msgs.sh "npm i" "updating dependencies" "npm update failed." "All dependencies at latest."

./bin/setup/git.sh

./bin/start.sh

printf "${Green}Welcome to your fresh workstation. Enjoy developing some more houndstooth.\n\n${NC}"
