#!/bin/bash

echo "export JASMINE_CONFIG_PATH=\"test/unit/jasmine.unit\"" >> ~/.bash_profile
. ~/.bash_profile
npm run cover