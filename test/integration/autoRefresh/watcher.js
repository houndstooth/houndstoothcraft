const http = require('http')
const fs = require('fs')
const process = require('process')

http.createServer((req, res) => {
	if (req.url === '/codeUpdates') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})

		fs.watchFile('test/integration/dist/bundle.js', { interval: 100 }, () => {
			res.write('data: reload\n\n')
		})
	}
}).listen(process.env.KARMA_WATCHER_PORT)

process.on('SIGINT', () => fs.unwatchFile('test/integration/dist/bundle.js'))
