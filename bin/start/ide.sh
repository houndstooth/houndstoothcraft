#!/bin/bash

if hash webstorm 2>/dev/null; then
    webstorm .
else
    start "" /c/Program\ Files\ \(x86\)/Sublime\ Text\ 3/subl.exe
fi