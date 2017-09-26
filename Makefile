.PHONY: test

start:
	sh ./bin/start.sh

setup:
	sh ./bin/setup.sh

ship:
	sh ./bin/ship.sh

test:
	npm run unit

stop:
	sh ./bin/stop.sh
