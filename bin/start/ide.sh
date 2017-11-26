#!/usr/bin/env sh

set -e

if hash webstorm 2>/dev/null; then
    webstorm .
else
    start "" /c/Program\ Files/JetBrains/WebStorm\ 2017.2.4/bin/webstorm64.exe
fi