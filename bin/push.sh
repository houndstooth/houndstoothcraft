#!/bin/bash

set -e

git submodule foreach git push
git push