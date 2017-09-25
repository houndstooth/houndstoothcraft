#!/bin/bash

if [ -z ${PWS_ORG+x} ]; then
    printf "Please set PWS_ORG, PWS_SPACE, PWS_USERNAME, and PWS_PASSWORD environment variables to use this script.\n\n"
    exit 0
else
    cf login -a api.run.pivotal.io -o "${PWS_ORG}" -s "${PWS_SPACE}" -u "${PWS_USERNAME}" -p ${PWS_PASSWORD}
fi

webpack -p
cf push
