const webpackConfig = require('./webpack.config')
webpackConfig.entry = undefined

module.exports = config => {
	config.set({
		frameworks: [ 'jasmine' ],
		files: [ 'test/**/*.js', 'effects/*/test/**/*.js' ],
		webpack: webpackConfig,
		preprocessors: { './test/**/*.js': ['webpack'] },
		reporters: [ 'kjhtml' ],
		customLaunchers: {
			ChromeNoSandboxHeadless: {
				base: 'Chrome',
				flags: [
					'--no-sandbox',
					// See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
					'--headless',
					'--disable-gpu',
					// Without a remote debugging port, Google Chrome exits immediately.
					' --remote-debugging-port=9222',
				],
			},
		}
	})
}
