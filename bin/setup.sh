#!/bin/bash

npm i

git config user.name \"Douglas Blumeyer\"
git config user.email douglas.blumeyer@gmail.com

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git config user.name \"Douglas Blumeyer\"
git submodule foreach git config user.email douglas.blumeyer@gmail.com

npm run startup

printf "Welcome to your fresh workstation, Douglas. Enjoy developing some more houndstooth.\n\n"
