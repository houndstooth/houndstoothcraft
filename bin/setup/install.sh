#!/usr/bin/env sh

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
    type /c/Program\ Files/JetBrains/WebStorm\ 2017.2.4/bin/webstorm > /dev/null 2>&1
    if [[ $? -ne 0 ]] ; then
         printf "${Yellow}Missing Webstorm.${NC}\n"
    else
         printf "${Blue}Webstorm found.\n${NC}"
    fi

    if hash cf > /dev/null 2>&1 ; then
         printf "${Blue}Cloud Foundry CLI and Autopilot plugin found.${NC}\n"
    else
         printf "${Yellow}Missing Cloud Foundry CLI and Autopilot plugin.${NC}\n"
    fi

    type /c/Program\ Files/Git/git-bash.exe > /dev/null 2>&1
    if [[ $? -ne 0 ]] ; then
         printf "${Yellow}Missing Git Bash.${NC}\n"
    else
         printf "${Blue}Git Bash found.\n${NC}"
    fi

    type /c/Program\ Files\ \(x86\)/Google/Chrome/Application/chrome.exe > /dev/null 2>&1
    if [[ $? -ne 0 ]] ; then
         printf "${Yellow}Missing Google Chrome.${NC}\n"
    else
         printf "${Blue}Google Chrome found.\n${NC}"
    fi
fi
