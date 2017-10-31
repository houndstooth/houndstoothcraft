#!/usr/bin/env sh

set -e

touch ~/.bash_profile
sed -i -e "/web-render/d" ~/.bash_profile
echo 'export PATH=$PATH:~/workspace/web-render/node_modules/.bin' >> ~/.bash_profile
