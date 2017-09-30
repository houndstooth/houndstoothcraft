const http = require('http')
const fs = require('fs')
// const { exec } = require('child_process')

http.createServer((req, res) => {
	if (req.url === '/codeUpdates') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})

		fs.watchFile('test/integration/dist/bundle.js', { interval: 1000 }, () => {
			res.write('data: reload\n\n')
			// exec('./bin/ship/fail_if_slow_tests.sh')
		})
	}
}).listen(1234)
