#!/usr/bin/env sh

git config --get user.name > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    printf "${Yellow}Please set your global git user name: ${NC}"
    read USER_NAME
    git config --global user.name $USER_NAME
fi

git config --get user.email > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    printf "${Yellow}Please set your global git user email: ${NC}"
    read USER_EMAIL
    git config --global user.email $USER_EMAIL
fi

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git pull -r
git pull -r
