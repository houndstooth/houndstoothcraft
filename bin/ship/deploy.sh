#!/usr/bin/env sh

set -e

if [[ -z "${PWS_ORG+x}" ]] ; then
    printf "${Cyan}Please set PWS_ORG, PWS_SPACE, PWS_USERNAME, and PWS_PASSWORD environment variables if you would like to automatically push to a Cloud Foundry.\n${NC}"
    exit 1
else
    cf login -a api.run.pivotal.io -o "$PWS_ORG" -s "$PWS_SPACE" -u "$PWS_USERNAME" -p "$PWS_PASSWORD"
fi

cf zero-downtime-push houndstooth -f manifest.yml
