#!/usr/bin/env sh

set -e

if hash webstorm 2>/dev/null; then
    webstorm .
else
    printf "I never liked this starting Webstorm automatically thing anyway... not since I first wrote it, anyway, I suppose."
#    start "" /c/Program\ Files/JetBrains/WebStorm\ 2017.3.2/bin/webstorm64.exe
fi
