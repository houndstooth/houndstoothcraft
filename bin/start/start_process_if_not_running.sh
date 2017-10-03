#!/usr/bin/env sh

CMD="$1"
PORT=$2

netstat -an | grep $PORT | grep LISTEN > /dev/null 2>&1
if [[ $? -ne 0 ]] ; then $(eval "$CMD") ; fi
