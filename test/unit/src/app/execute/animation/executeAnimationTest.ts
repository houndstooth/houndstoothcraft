import {
	animator,
	buildAnimationFunction,
	executeAnimation,
	ExecuteParams,
	SettingFunctionObject,
} from '../../../../../../src/indexForTest'

describe('execute animation', () => {
	let subject: (_: ExecuteParams) => Promise<(resolveAnimation: () => void) => void>
	const animationFunction: (p: number) => number = (p: number): number => p

	let layerFunctionObjects: SettingFunctionObject[]
	let animationFunctionObjects: SettingFunctionObject[]

	beforeEach(() => {
		subject = executeAnimation.default
		spyOn(animator, 'default')
		spyOn(buildAnimationFunction, 'default').and.returnValue(animationFunction)
		layerFunctionObjects = []
		animationFunctionObjects = []
	})

	it('calls the animator', () => {
		subject({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(animator.default).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
		}))
	})

	it('builds an animation function', () => {
		subject({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(buildAnimationFunction.default).toHaveBeenCalledWith(
			jasmine.objectContaining({
				animationFunctionObjects,
				layerFunctionObjects,
			}),
		)
	})
})
