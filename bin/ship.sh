#!/bin/bash

set -ex

npm update
npm run lint-fix
npm run pull-all
npm run cover
npm run check-coverage
npm run catch-slow
npm run push-all
npm run deploy
