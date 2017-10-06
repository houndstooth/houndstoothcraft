const fs = require('fs')
const http = require('http')
const process = require('process')
const { spawnSync } = require('child_process')

/* eslint-disable no-console */

let fsTimeout = false
let testsWatcher
let srcWatcher

const runTests = (res, dir) => {
	if (!fsTimeout) {
		console.log(`Change in ${dir} detected.`)
		fsTimeout = setTimeout(() => fsTimeout = false, 500)
		spawnSync('./bin/test/unit_tests_and_cover.sh', { stdio: 'inherit' })
		res.write('data: reload\n\n')
	}
}

process.on('SIGINT', () => {
	console.log('Unwatching.')
	testsWatcher.close()
	srcWatcher.close()
})

http.createServer((req, res) => {
	if (req.url === '/codeUpdates') {
		console.log('Connected to coverage report page.')
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})

		testsWatcher && testsWatcher.close()
		srcWatcher && srcWatcher.close()

		testsWatcher = fs.watch('test/unit/src', { recursive: true }, () => runTests(res, 'tests'))
		srcWatcher = fs.watch('src', { recursive: true }, () => runTests(res, 'src'))
	}
}).listen(process.env.ISTANBUL_WATCHER_PORT)

console.log('Watching for changes.')
