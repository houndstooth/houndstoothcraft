#!/bin/bash

set -e

npm update
npm run lint-fix

git pull -r
git submodule foreach git pull -r

npm run cover
npm run check-coverage

if npm run integration | tee /dev/tty | grep -q 'SLOW' ; then
   printf "Slow tests detected.\n\n"
   exit 1
fi

git submodule foreach git push
git push

if [[ -z ${PWS_ORG+x} ]] ; then
    printf "Please set PWS_ORG, PWS_SPACE, PWS_USERNAME, and PWS_PASSWORD environment variables to use this script.\n\n"
    exit 0
else
    cf login -a api.run.pivotal.io -o "$PWS_ORG" -s "$PWS_SPACE" -u "$PWS_USERNAME" -p "$PWS_PASSWORD"
fi

npm run build
cf zero-downtime-push