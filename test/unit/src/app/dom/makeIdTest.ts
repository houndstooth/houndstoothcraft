import { makeId } from '../../../../../src/indexForTest'

describe('make id', () => {
	let subject: (_: string) => string
	beforeEach(() => {
		subject = makeId.default
	})

	it('kebab-cases the string', () => {
		expect(subject('mock tooth')).toBe('mock-tooth')
	})
})
