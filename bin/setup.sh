#!/bin/bash

if [[ $OSTYPE == darwin* ]] ; then
    brew tap cloudfoundry/tap
    brew install cf-cli
else
    printf "Cloud Foundry CLI not automatically installed. Don't forget to manually install before attempting to deploy.\n\n"
fi

npm i

git config user.name \"Douglas Blumeyer\"
git config user.email douglas.blumeyer@gmail.com

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git config user.name \"Douglas Blumeyer\"
git submodule foreach git config user.email douglas.blumeyer@gmail.com

npm run coverage
npm run startup

printf "Welcome to your fresh workstation, Douglas. Enjoy developing some more houndstooth.\n\n"
