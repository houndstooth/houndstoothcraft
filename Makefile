.PHONY: test

start:
	sh ./bin/start.sh

setup:
	sh ./bin/setup.sh && exec bash --login

ship:
	sh ./bin/ship.sh

test:
	npm run unit

stop:
	sh ./bin/stop.sh
