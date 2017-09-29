#!/bin/bash

set -e

if hash cf 2>/dev/null; then
    printf "Cloud Foundry CLI found.\n\n"
else
    if [[ $OSTYPE == darwin* ]] ; then
        brew tap cloudfoundry/tap
        brew install cf-cli
    else
        printf "Cloud Foundry CLI not automatically installed. Don't forget to manually install before attempting to deploy.\n\n"
    fi

    curl -L $(curl -s https://api.github.com/repos/contraband/autopilot/releases/latest | grep browser_download_url | grep darwin | cut -d '"' -f 4) --output autopilot-darwin
    chmod +x autopilot-darwin
    cf install-plugin autopilot-darwin -y
    rm autopilot-darwin
fi

npm i

git config user.name \"Douglas Blumeyer\"
git config user.email douglas.blumeyer@gmail.com

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git config user.name \"Douglas Blumeyer\"
git submodule foreach git config user.email douglas.blumeyer@gmail.com

echo "export JASMINE_CONFIG_PATH=\"test/unit/jasmine.unit\"" >> ~/.bash_profile
. ~/.bash_profile
npm run cover

sh ./bin/start.sh

printf "Welcome to your fresh workstation, Douglas. Enjoy developing some more houndstooth.\n\n"
