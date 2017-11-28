import { standardAnimation, state, to } from '../../../../../src'
import { isCloseTo } from '../../../../helpers'

const subject: () => number = standardAnimation.default

describe('standard animation', () => {
	it('multiplies the property by the standard animation rate each frame', () => {
		state.currentFrame = to.Frame(0)
		expect(isCloseTo(subject(), 1)).toBe(true)

		state.currentFrame = to.Frame(1)
		expect(isCloseTo(subject(), 1.001)).toBe(true)

		state.currentFrame = to.Frame(2)
		expect(isCloseTo(subject(), 1.002001)).toBe(true)

		state.currentFrame = to.Frame(3)
		expect(isCloseTo(subject(), 1.003002001)).toBe(true)
	})
})
