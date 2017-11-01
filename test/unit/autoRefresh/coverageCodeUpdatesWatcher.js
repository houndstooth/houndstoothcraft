const fs = require('fs')
const os = require('os')
const http = require('http')
const process = require('process')
const { execSync, spawnSync } = require('child_process')

let fsTimeout = false
let testsWatcher
let srcWatcher

const runTests = res => {
	if (!fsTimeout) {
		fsTimeout = setTimeout(() => fsTimeout = false, 500)

		if (os.platform() === 'win32') {
			execSync('sh ./bin/test/unit_tests_and_cover.sh', { stdio: 'inherit', shell: true })
		}
		else {
			spawnSync('./bin/test/unit_tests_and_cover.sh', { stdio: 'inherit' })
		}
		res.write('data: reload\n\n')
	}
}

http.createServer((req, res) => {
	if (req.url === '/codeUpdates') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})

		testsWatcher && testsWatcher.close()
		srcWatcher && srcWatcher.close()

		testsWatcher = fs.watch('test/unit/src', { recursive: true }, () => runTests(res))
		srcWatcher = fs.watch('src', { recursive: true }, () => runTests(res))
	}
}).listen(process.env.COVERAGE_CODE_UPDATES_WATCHER_PORT)

process.on('SIGINT', () => {
	testsWatcher && testsWatcher.close()
	srcWatcher && srcWatcher.close()
})
