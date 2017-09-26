#!/bin/bash

set -ex

npm update
npm run lint-fix
npm run pull-all
npm run coverage
npm run integration
npm run push-all
npm run deploy
