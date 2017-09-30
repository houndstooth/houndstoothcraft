new EventSource('http://localhost:6789/codeUpdates').addEventListener('message', () => window.location.reload())
