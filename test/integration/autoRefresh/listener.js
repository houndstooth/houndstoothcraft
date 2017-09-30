new EventSource('http://localhost:1234/codeUpdates').addEventListener('message', () => window.location.reload())
