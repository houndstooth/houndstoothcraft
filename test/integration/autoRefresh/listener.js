const eventSource = new EventSource(`http://localhost:${process.env.KARMA_WATCHER_PORT}/codeUpdates`)
eventSource.addEventListener('message', () => window.location.reload())
