const http = require('http')
const fs = require('fs')
const process = require('process')

http.createServer((req, res) => {
	let filename = 'dist/'
	filename += req.url === '/' ? 'index.html' : req.url
	fs.readFile(filename, 'binary', (_, file) => {
		res.writeHead(200)
		res.write(file, 'binary')
		res.end()
	})
}).listen(process.env.DEV_SERVER_PORT)
