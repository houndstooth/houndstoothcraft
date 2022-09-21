// tslint:disable:no-any no-unsafe-any typedef
// @ts-ignore
declare const require: any

// @ts-ignore
const testsContext = require.context('./tests', true)
testsContext.keys().forEach(testsContext)

// @ts-ignore
const effectTestsContext = require.context('../../effects', true, /integration\/.*Test.ts$/)
effectTestsContext.keys().forEach(effectTestsContext)
