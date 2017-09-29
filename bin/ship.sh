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

sh ./bin/ship/deploy.sh