#!/usr/bin/env sh

git config --get user.name
if [[ $? -ne 0 ]] ; then
    printf "${Yellow}Please set your global git user name: ${NC}"
    read USER_NAME
    git config --global user.name $USER_NAME
fi

git config --get user.email
if [[ $? -ne 0 ]] ; then
    printf "${Yellow}Please set your global git user email: ${NC}"
    read USER_EMAIL
    git config --global user.name $USER_EMAIL
fi

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git pull -r
