#!/usr/bin/env sh

set -e

if [[ $OSTYPE == darwin* ]] ; then
    if hash brew 2>/dev/null; then
        printf "${Blue}Homebrew found.\n${NC}"
    else
        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    fi

    if hash webstorm 2>/dev/null; then
        printf "${Blue}Webstorm found.\n${NC}"
    else
        brew cask install webstorm
    fi

    if hash cf 2>/dev/null; then
        printf "${Blue}Cloud Foundry CLI found.\n${NC}"
    else
        brew tap cloudfoundry/tap
        brew install cf-cli

        curl -L $(curl -s https://api.github.com/repos/contraband/autopilot/releases/latest | grep browser_download_url | grep darwin | cut -d '"' -f 4) --output autopilot-darwin
        chmod +x autopilot-darwin
        cf install-plugin autopilot-darwin -y
        rm autopilot-darwin
    fi

    if [[ -e /Applications/iTerm.app/ ]] ; then
        printf "${Blue}iTerm2 found.\n${NC}"
    else
        brew cask install iterm2
    fi

    if [[ -e /Applications/Google\ Chrome.app/ ]] ; then
        printf "${Blue}Google Chrome found.\n${NC}"
    else
        brew cask install google-chrome
    fi
else
    if [[ -e /c/Program\ Files\ \(x86\)/Sublime\ Text\ 3/subl.exe ]] ; then printf "Missing Sublime.\n"; fi
    if hash cf 2>/dev/null; then printf "Missing Cloud Foundry CLI and Autopilot plugin.\n"; fi
    if [[ -e /c/Program\ Files/Git/git-bash.exe ]] ; then printf "Missing Git BASH.\n"; fi
    if [[ -e /c/Program\ Files\ \(x86\)/Google/Chrome/Application/chrome.exe ]] ; then printf "Missing Google Chrome.\n"; fi
fi
