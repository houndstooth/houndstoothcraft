import { from, state, to } from '../../../../src'
import { standardAnimation } from '../../../../src/animation/standardAnimation'

describe('standard animation', () => {
	it('multiplies the property by the standard animation rate each frame', () => {
		state.currentFrame = to.Frame(0)
		const propertyAtCurrentFrame: number = 4
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtCurrentFrame)

		state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		let propertyAtNextFrame: number = propertyAtCurrentFrame * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)

		state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		propertyAtNextFrame = propertyAtCurrentFrame * 1.000005 * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)

		state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		propertyAtNextFrame = propertyAtCurrentFrame * 1.000005 * 1.000005 * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)
	})
})
