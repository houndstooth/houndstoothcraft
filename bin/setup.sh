#!/usr/bin/env sh

set -e

sed -i -e "/web-render/d" ~/.bash_profile
echo 'export PATH=$PATH:~/workspace/web-render/node_modules/.bin' >> ~/.bash_profile
source ~/.bash_profile

npm i -g npm

./bin/setup/install.sh

npm i

./bin/setup/git.sh

./bin/start.sh

printf "${Green}Welcome to your fresh workstation. Enjoy developing some more houndstooth.\n\n${NC}"
