new EventSource(`http://localhost:${process.env.WATCHER_PORT}/codeUpdates`).addEventListener('message', () => window.location.reload())
