import {
	animator,
	buildAnimationFunction,
	executeAnimation,
	SettingsFunctionObject,
} from '../../../../../src'

describe('execute animation', () => {
	const animationFunction: (p: number) => number = (p: number): number => p

	let layerFunctionObjects: SettingsFunctionObject[]
	let animationFunctionObjects: SettingsFunctionObject[]

	beforeEach(() => {
		spyOn(animator, 'default')
		spyOn(buildAnimationFunction, 'default').and.returnValue(animationFunction)
		layerFunctionObjects = []
		animationFunctionObjects = []
	})

	it('calls the animator', () => {
		executeAnimation.default({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(animator.default).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
		}))
	})

	it('builds an animation function', () => {
		executeAnimation.default({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(buildAnimationFunction.default).toHaveBeenCalledWith(
			jasmine.objectContaining({
				animationFunctionObjects,
				layerFunctionObjects,
			}),
		)
	})
})
