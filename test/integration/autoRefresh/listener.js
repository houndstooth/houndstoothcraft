new EventSource(`http://localhost:${process.env.KARMA_WATCHER_PORT}/codeUpdates`).addEventListener('message', () => window.location.reload())
