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

    if hash cf 2>/dev/null; then
        printf "Cloud Foundry CLI found.\n"
    else
        brew tap cloudfoundry/tap
        brew install cf-cli

        curl -L $(curl -s https://api.github.com/repos/contraband/autopilot/releases/latest | grep browser_download_url | grep darwin | cut -d '"' -f 4) --output autopilot-darwin
        chmod +x autopilot-darwin
        cf install-plugin autopilot-darwin -y
        rm autopilot-darwin
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
    if [[ -e /c/Program\ Files/JetBrains/Webstorm\ 2017.2.4/bin/webstorm64.exe ]] ; then printf "Missing Webstorm.\n"; fi
    if hash cf 2>/dev/null; then printf "Missing Cloud Foundry CLI and Autopilot plugin.\n"; fi
    if [[ -e /c/Program\ Files/Git/git-bash.exe ]] ; then printf "Missing Git BASH.\n"; fi
    if [[ -e /c/Program\ Files\ \(x86\)/Google/Chrome/Application/chrome.exe ]] ; then printf "Missing Google Chrome.\n"; fi
fi
