import { shouldRecurse } from '../../../../../src/indexForTest'

// tslint:disable-next-line:no-any
const subject: (_: any) => boolean = shouldRecurse.default

describe('should recurse', () => {
	it('says you should recurse further if passed a settings object', () => {
		expect(subject({ tileResolution: 45 })).toBe(true)
	})

	it('says you should not recurse deeper if passed an array', () => {
		expect(subject([ 1, 2, 3 ])).toBe(false)
	})

	it('says you should not recurse deeper if it recognizes the object as a color object', () => {
		expect(subject({ r: 100, g: 200, b: 0, a: 1 })).toBe(false)
	})
})
