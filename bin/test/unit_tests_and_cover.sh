#!/usr/bin/env sh

set -e

nyc jasmine

sh ./bin/test/inject_listener_into_coverage_page.sh