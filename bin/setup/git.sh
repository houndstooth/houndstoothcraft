#!/bin/bash

set -e

git config user.name \"Douglas Blumeyer\"
git config user.email douglas.blumeyer@gmail.com

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git config user.name \"Douglas Blumeyer\"
git submodule foreach git config user.email douglas.blumeyer@gmail.com
