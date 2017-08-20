import standardAnimation from '../../../src/animation/standardAnimation'
import store from '../../../store'

describe('standard animation', () => {
	it('multiplies the property by the standard animation rate each frame', () => {
		store.currentAnimationFrame = 0
		let propertyAtCurrentFrame = 4
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtCurrentFrame)

		store.currentAnimationFrame++
		let propertyAtNextFrame = propertyAtCurrentFrame * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)

		store.currentAnimationFrame++
		propertyAtNextFrame = propertyAtCurrentFrame * 1.000005 * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)

		store.currentAnimationFrame++
		propertyAtNextFrame = propertyAtCurrentFrame * 1.000005 * 1.000005 * 1.000005
		expect(standardAnimation(propertyAtCurrentFrame)).toBe(propertyAtNextFrame)
	})
})
