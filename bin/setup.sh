#!/bin/bash

set -ex

if hash cf 2>/dev/null; then
    printf "Cloud Foundry CLI found.\n\n"
else
    if [[ $OSTYPE == darwin* ]] ; then
        brew tap cloudfoundry/tap
        brew install cf-cli
    else
        printf "Cloud Foundry CLI not automatically installed. Don't forget to manually install before attempting to deploy.\n\n"
    fi
fi

npm i

git config user.name \"Douglas Blumeyer\"
git config user.email douglas.blumeyer@gmail.com

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git config user.name \"Douglas Blumeyer\"
git submodule foreach git config user.email douglas.blumeyer@gmail.com

echo "export JASMINE_CONFIG_PATH=./test/unit/jasmine.json" > ~/.bash_profile
source ~/.bash_profile
npm run cover

sh ./bin/start.sh

printf "Welcome to your fresh workstation, Douglas. Enjoy developing some more houndstooth.\n\n"
