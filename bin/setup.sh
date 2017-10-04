#!/usr/bin/env sh

set -e

sed -i -e "/web-render/d" ~/.bash_profile
echo "source ~/workspace/web-render/.env" >> ~/.bash_profile
source ~/.bash_profile

sh ./bin/setup/install.sh

npm i

sh ./bin/setup/git.sh

sh ./bin/start.sh

printf "Welcome to your fresh workstation. Enjoy developing some more houndstooth.\n\n"
