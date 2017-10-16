#!/usr/bin/env sh

if [[ $OSTYPE == darwin* ]] ; then
    . .env.bat
    eval "${1}"
else
    call .env.bat
    eval "${1}"
fi
