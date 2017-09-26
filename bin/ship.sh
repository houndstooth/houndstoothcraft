#!/bin/bash

set -ex

npm update
npm run lint-fix
npm run coverage
npm run integration
npm run pull-all
npm run push-all
npm run deploy
