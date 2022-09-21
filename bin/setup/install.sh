#!/usr/bin/env sh

set -e

if [[ $OSTYPE == darwin* ]] ; then
    if hash brew 2>/dev/null; then
        printf "Homebrew found.\n"
    else
        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    fi

    if hash node 2>/dev/null; then
        printf "Node found.\n"
    else
        brew install node
    fi

    if hash webstorm 2>/dev/null; then
        printf "Webstorm found.\n"
    else
        brew cask install webstorm
    fi

    if gcloud cf 2>/dev/null; then
        printf "Google Cloud Platform CLI found.\n"
    else
        printf "Missing Google Cloud Platform CLI.\n"
    fi

    if [[ -e /Applications/iTerm.app/ ]] ; then
        printf "iTerm2 found.\n"
    else
        brew cask install iterm2
    fi

    if [[ -e /Applications/Google\ Chrome.app/ ]] ; then
        printf "Google Chrome found.\n"
    else
        brew cask install google-chrome
    fi
else
    if hash node 2>/dev/null; then printf "Missing Node.\n"; fi
    if [[ -e /c/Program\ Files/JetBrains/Webstorm\ 2017.3.2/bin/webstorm64.exe ]] ; then printf "Missing Webstorm.\n"; fi
    if hash gcloud 2>/dev/null; then printf "Missing Google Cloud Platform CLI.\n"; fi
    if [[ -e /c/Program\ Files/Git/git-bash.exe ]] ; then printf "Missing Git BASH.\n"; fi
    if [[ -e /c/Program\ Files\ \(x86\)/Google/Chrome/Application/chrome.exe ]] ; then printf "Missing Google Chrome.\n"; fi
fi
