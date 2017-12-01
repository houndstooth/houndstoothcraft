#!/usr/bin/env sh

set -e

tslint '**/*.ts' -e **/node_modules/** --fix --project tsconfig.json
