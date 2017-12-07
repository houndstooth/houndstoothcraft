import { makeId } from '../../../../../src'

const subject: (_: string) => string = makeId.default

describe('make id', () => {
	it('kebab-cases the string', () => {
		expect(subject('mock tooth')).toBe('mock-tooth')
	})
})
