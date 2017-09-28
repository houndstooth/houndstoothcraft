const testsContext = require.context('./tests', true)
testsContext.keys().forEach(testsContext)

const effectTestsContext = require.context('../../effects', true, /integration\/.*Test.js$/)
effectTestsContext.keys().forEach(effectTestsContext)
