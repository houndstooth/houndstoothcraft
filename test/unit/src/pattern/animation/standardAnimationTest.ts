import { getCurrentFrame, standardAnimation, to } from '../../../../../src/indexForTest'
import { isCloseTo } from '../../../../helpers'
import Spy = jasmine.Spy

describe('standard animation', () => {
	it('multiplies the property by the standard animation rate each frame', () => {
		const subject: () => number = standardAnimation.default
		const getCurrentFrameSpy: Spy = spyOn(getCurrentFrame, 'default')

		getCurrentFrameSpy.and.returnValue(to.Frame(0))
		expect(isCloseTo(subject(), 1)).toBe(true)

		getCurrentFrameSpy.and.returnValue(to.Frame(1))
		expect(isCloseTo(subject(), 1.001)).toBe(true)

		getCurrentFrameSpy.and.returnValue(to.Frame(2))
		expect(isCloseTo(subject(), 1.002001)).toBe(true)

		getCurrentFrameSpy.and.returnValue(to.Frame(3))
		expect(isCloseTo(subject(), 1.003002001)).toBe(true)
	})
})
