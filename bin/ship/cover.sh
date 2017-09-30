#!/bin/bash

./node_modules/.bin/babel-node node_modules/babel-istanbul/lib/cli.js cover node_modules/jasmine/bin/jasmine.js --config test/unit/.istanbul.yml