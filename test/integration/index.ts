// tslint:disable:no-any no-unsafe-any typedef
declare const require: any

const testsContext = require.context('./tests', true)
testsContext.keys().forEach(testsContext)

const effectTestsContext = require.context('../../effects', true, /integration\/.*Test.ts$/)
effectTestsContext.keys().forEach(effectTestsContext)
