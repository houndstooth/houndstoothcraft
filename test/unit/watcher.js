const fs = require('fs')
const process = require('process')
const { spawn } = require('child_process')

/* eslint-disable no-console */

let fsTimeout = false

console.log('Watching for changes.')
const testsWatcher = fs.watch('test/unit/src', { recursive: true }, () => runTests('tests'))
const srcWatcher = fs.watch('src', { recursive: true }, () => runTests('src'))

const runTests = dir => {
	if (!fsTimeout) {
		console.log(`change in ${dir} detected`)
		spawn('./bin/test/unit.sh', { stdio: 'inherit' })
		fsTimeout = setTimeout(() => fsTimeout = false, 500)
	}
}

process.on('SIGINT', () => {
	console.log('Unwatching.')
	testsWatcher.close()
	srcWatcher.close()
})
