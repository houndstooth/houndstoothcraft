const fs = require('fs')
const http = require('http')
const process = require('process')

http.createServer((req, res) => {
	const filename = 'test/unit/coverage/lcov-report' + req.url
	fs.readFile(filename, 'binary', (_, file) => {
		res.writeHead(200)
		file && res.write(file, 'binary')
		res.end()
	})
}).listen(process.env.COVERAGE_REPORT_SERVER_PORT)
