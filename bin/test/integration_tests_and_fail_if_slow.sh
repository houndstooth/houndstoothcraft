#!/usr/bin/env sh

set -e
set -o pipefail

sh ./bin/test/integration.sh | tee /dev/tty > test/integration/slowness-report.txt

if cat test/integration/slowness-report.txt | grep -q 'SLOW' ; then
   printf "${Red}Slow tests detected. See test/integration/slowness-report.txt for details.\n\n${NC}"
   awk '/SLOW/' test/integration/slowness-report.txt | cut -d " " -f 8- > temp
   mv temp test/integration/slowness-report.txt
   exit 1
fi
