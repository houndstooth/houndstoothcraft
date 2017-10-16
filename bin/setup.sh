#!/usr/bin/env sh

set -e

./bin/shared/cmd_w_msgs.sh "sed -i -e \"/web-render/d\" ~/.bash_profile && echo 'export PATH=\$PATH:~/workspace/web-render/node_modules/.bin' >> ~/.bash_profile" "profiling binaries" "Something went wrong adding the node_modules binaries to your bash profile." "This project's node_modules binaries are now available on the path via your bash profile."

./bin/shared/cmd_w_msgs.sh "npm i -g npm" "upgrading npm" "npm upgrade failed." "npm at latest."

./bin/setup/install.sh

./bin/shared/cmd_w_msgs.sh "npm i" "updating dependencies" "npm update failed." "All dependencies at latest."

./bin/setup/git.sh

./bin/start.sh

printf "${Green}Welcome to your fresh workstation. Enjoy developing some more houndstooth.\n\n${NC}"
