const integrationTestCodeUpdatesEventSource = new EventSource(
	`http://localhost:${process.env.INTEGRATION_TEST_CODE_UPDATES_WATCHER_PORT}/codeUpdates`
)
integrationTestCodeUpdatesEventSource.addEventListener('reload', () => window.location.reload())
