import { from, state, to } from '../../../../src'
import { standardAnimation } from '../../../../src/animation/standardAnimation'

describe('standard animation', () => {
	it('multiplies the property by the standard animation rate each frame', () => {
		state.currentAnimationFrame = to.Frame(0)
		const propertyAtCurrentFrame = 4
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtCurrentFrame)

		state.currentAnimationFrame = to.Frame(from.Frame(state.currentAnimationFrame) + 1)
		let propertyAtNextFrame = propertyAtCurrentFrame * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)

		state.currentAnimationFrame = to.Frame(from.Frame(state.currentAnimationFrame) + 1)
		propertyAtNextFrame = propertyAtCurrentFrame * 1.000005 * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)

		state.currentAnimationFrame = to.Frame(from.Frame(state.currentAnimationFrame) + 1)
		propertyAtNextFrame = propertyAtCurrentFrame * 1.000005 * 1.000005 * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)
	})
})
