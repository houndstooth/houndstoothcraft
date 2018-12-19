cover:
	npm run cover

.PHONY: lint
lint:
	npm run lint

setup:
	npm run setup

start:
	npm start

ship:
	npm run ship

stop:
	npm run stop

pull:
	npm run pull

push:
	npm run push

restart:
	npm run restart

.PHONY: test
test:
	npm t

ci:
	npm run ci

wip-push:
	npm run wip-push

wip-pull:
	npm run wip-pull