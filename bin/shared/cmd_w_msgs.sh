#!/usr/bin/env sh

CMD="$1"
DESCRIPTION="$2"
ERROR_MESSAGE="$3"
SUCCESS_MESSAGE="$4"

CMD="${CMD}"'> /tmp/cmd_output 2>&1 & pid=$!; s="-\|/"; i=0; while kill -0 $pid > /dev/null 2>&1; do i=$(( (i+1) %4 )); printf "'"${Yellow}"'\r${s:$i:1} '"$DESCRIPTION"'...'"${NC}"'"; sleep .1; done; printf "\33[2K\r"; if wait $pid; then printf ""; else false; fi;'

tmpfile=$(mktemp /tmp/cmd_output 2>&1)

eval "${CMD}"
if [[ $? == 1 ]] ; then
    cat /tmp/cmd_output
    printf "${Red}${ERROR_MESSAGE}${NC}\n"
    exit 1
else
    printf "${Cyan}${SUCCESS_MESSAGE}${NC}\n"
fi
