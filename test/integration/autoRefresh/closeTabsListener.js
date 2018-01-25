const closeTabsEventSource = new EventSource(`http://localhost:${__karma__.config.CLOSE_TABS_WATCHER_PORT}/tabs`)

let devServerTab
if (!localStorage.devServerTab) {
	devServerTab = window.open(`http://localhost:${__karma__.config.DEV_SERVER_PORT}`, 'devServer')
	localStorage.setItem("devServerTab", devServerTab)
}

let coverageTab
if (!localStorage.coverageTab) {
	coverageTab = window.open(`http://localhost:${__karma__.config.COVERAGE_REPORT_SERVER_PORT}/index.html`, 'coverageTab')
	localStorage.setItem("coverageTab", coverageTab)
}

let asanaTab
if (!localStorage.asanaTab) {
	asanaTab = window.open(`https://app.asana.com/0/358570257763740/list`, 'asanaTab')
	localStorage.setItem("asanaTab", asanaTab)
}

let githubTab
if (!localStorage.githubTab) {
	githubTab = window.open(`https://github.com/houndstooth/web-render`, 'githubTab')
	localStorage.setItem("githubTab", githubTab)
}

let prodTab
if (!localStorage.prodTab) {
	prodTab = window.open(`http://houndstooth.douglasblumeyer.com`, 'prodTab')
	localStorage.setItem("prodTab", prodTab)
}

closeTabsEventSource.addEventListener('close', () => {
	localStorage.removeItem("devServerTab")
	devServerTab && devServerTab.close()

	localStorage.removeItem("coverageTab")
	coverageTab && coverageTab.close()

	localStorage.removeItem("asanaTab")
	asanaTab && asanaTab.close()

	localStorage.removeItem("githubTab")
	githubTab && githubTab.close()

	localStorage.removeItem("prodTab")
	prodTab && prodTab.close()

	window.close()
})
