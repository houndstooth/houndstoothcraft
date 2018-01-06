#!/usr/bin/env sh

set -e

if hash webstorm 2>/dev/null; then
    webstorm .
else
    start "" /c/Program\ Files/JetBrains/WebStorm\ 2017.3.2/bin/webstorm64.exe
fi
