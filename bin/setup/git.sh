#!/usr/bin/env sh

git config --get user.name
if [[ $? -ne 0 ]] ; then
    printf "${Red}Please set your global git user name and retry.\n\n${NC}"
    exit 1
fi

git config --get user.email
if [[ $? -ne 0 ]] ; then
    printf "${Red}Please set your global git user email and retry.\n\n${NC}"
    exit 1
fi

git submodule update --init --recursive
git submodule foreach git checkout master
git submodule foreach git pull -r
