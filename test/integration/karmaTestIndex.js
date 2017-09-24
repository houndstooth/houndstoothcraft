const testsContext = require.context('.', true, /Test.js$/)
testsContext.keys().forEach(testsContext)

const effectTestsContext = require.context('../../effects', true, /effects\/.*Test.js$/)
effectTestsContext.keys().forEach(effectTestsContext)
