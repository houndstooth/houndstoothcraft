#!/bin/bash

if npm run integration | tee /dev/tty | tee test/unit/slowness-report.txt | grep -q 'SLOW' ; then
   printf "Slow tests detected.\n\n"
#   awk '/SLOW/' test/unit/slowness-report.txt > temp && mv temp test/unit/slowness-report.txt
   exit 1
fi
