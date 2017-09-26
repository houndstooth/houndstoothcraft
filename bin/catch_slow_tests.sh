#!/bin/bash

OUTPUT=$(npm run integration | tee /dev/tty)

#echo "$OUTPUT"
if echo "$OUTPUT" | grep -q 'SLOW' ; then
   printf "Slow tests detected.\n\n"
   exit 1
fi
