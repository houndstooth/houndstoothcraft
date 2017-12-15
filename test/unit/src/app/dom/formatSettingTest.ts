import { formatSetting } from '../../../../../src/indexForTest'

describe('format setting', () => {
	// tslint:disable-next-line:no-any
	let subject: (setting: any) => string
	beforeEach(() => {
		subject = formatSetting.default
	})

	it('formats functions', () => {
		const aFunction: (_: number) => boolean = (t: number): boolean => Math.random() * t > 10

		expect(subject(aFunction)).toBe('function (t) { return Math.random() * t > 10; }')
	})

	it('returns strings as-is', () => {
		expect(subject('bird')).toBe('bird')
	})

	it('stringifies objects nicely', () => {
		expect(subject({ bird: 'is', the: 2 })).toBe('{"bird":"is","the":2}')
	})
})
