#!/usr/bin/env sh

CMD="$1"
PORT=$2
NAME="$3"

netstat -an | grep $PORT | grep -m1 LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then
    $(eval "${CMD}")
    printf "${Green}$NAME${NC} started on port ${Purple}$PORT${NC}.\n"
else
    printf "${Yellow}$NAME already running on port $PORT.${NC}\n"
fi
