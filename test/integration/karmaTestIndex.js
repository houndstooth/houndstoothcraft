var testsContext = require.context('.', true, /Test.js$/)
testsContext.keys().forEach(testsContext)

var effectTestsContext = require.context('../../effects', true, /effects\/.*Test.js$/)
effectTestsContext.keys().forEach(effectTestsContext)
