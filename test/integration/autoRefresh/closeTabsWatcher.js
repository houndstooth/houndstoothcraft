const http = require('http')
const fs = require('fs')
const process = require('process')

http.createServer((req, res) => {
	if (req.url === '/tabs') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})

		fs.watchFile('test/integration/autoRefresh/close', { interval: 100 }, () => {
			res.write('event: close\ndata: x\n\n')
		})
	}
}).listen(process.env.CLOSE_TABS_WATCHER_PORT)

process.on('SIGINT', () => fs.unwatchFile('test/integration/autoRefresh/close'))
