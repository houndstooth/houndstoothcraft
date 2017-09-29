const testsContext = require.context('./tests', true)
testsContext.keys().forEach(testsContext)

const effectTestsContext = require.context('../../effects', true, /integration\/.*Test.js$/)
effectTestsContext.keys().forEach(effectTestsContext)

new EventSource('http://localhost:6789/codeUpdates').addEventListener('message', () => window.location.reload())
