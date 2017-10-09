const http = require('http')
const fs = require('fs')
const process = require('process')

let srcWatcher

http.createServer((req, res) => {
	if (req.url === '/codeUpdates') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})

		fs.watchFile('test/integration/dist/bundle.js', { interval: 100 }, () => {
			res.write('event: reload\ndata: x\n\n')
		})

		srcWatcher && srcWatcher.close()
		srcWatcher = fs.watch('src', { recursive: true }, () => {
			res.write('event: reload\ndata: x\n\n')
		})
	}
}).listen(process.env.INTEGRATION_TEST_CODE_UPDATES_WATCHER_PORT)

process.on('SIGINT', () => {
	fs.unwatchFile('test/integration/dist/bundle.js')
	srcWatcher && srcWatcher.close()
})
