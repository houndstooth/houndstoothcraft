#!/usr/bin/env sh

set -e

touch ~/.bash_profile
sed -i -e "/houndstoothcraft/d" ~/.bash_profile
echo 'export PATH=$PATH:~/workspace/houndstoothcraft/node_modules/.bin' >> ~/.bash_profile
