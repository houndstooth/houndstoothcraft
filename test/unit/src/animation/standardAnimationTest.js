import standardAnimation from '../../../../src/animation/standardAnimation'
import state from '../../../../src/state'

describe('standard animation', () => {
	it('multiplies the property by the standard animation rate each frame', () => {
		state.currentAnimationFrame = 0
		let propertyAtCurrentFrame = 4
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtCurrentFrame)

		state.currentAnimationFrame++
		let propertyAtNextFrame = propertyAtCurrentFrame * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)

		state.currentAnimationFrame++
		propertyAtNextFrame = propertyAtCurrentFrame * 1.000005 * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)

		state.currentAnimationFrame++
		propertyAtNextFrame = propertyAtCurrentFrame * 1.000005 * 1.000005 * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)
	})
})
