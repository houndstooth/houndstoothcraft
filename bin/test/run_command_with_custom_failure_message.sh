#!/usr/bin/env sh

CMD="$1"
ERROR_MESSAGE="$2"

eval "${CMD}"
if [[ $? -ne 0 ]] ; then
    printf "${red}${ERROR_MESSAGE}${NC}\n\n"
    exit 1
fi
