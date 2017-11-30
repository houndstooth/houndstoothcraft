import {
	animator,
	buildAnimationFunction,
	executeAnimation,
	Frame,
	setSetting,
	SettingsFunctionObject,
	to,
} from '../../../../../src'

describe('execute animation', () => {
	const animationFunction: (p: number) => number = (p: number): number => p

	let layerFunctionObjects: SettingsFunctionObject[]
	let animationFunctionObjects: SettingsFunctionObject[]

	let frameRate: number
	let refreshCanvas: boolean
	let endFrame: Frame

	beforeEach(() => {
		spyOn(animator, 'default')
		spyOn(buildAnimationFunction, 'default').and.returnValue(animationFunction)
	})

	describe('configured', () => {
		beforeEach(() => {
			layerFunctionObjects = []
			animationFunctionObjects = []

			frameRate = 5
			endFrame = to.Frame(7)
			refreshCanvas = false

			setSetting.default('animationSettings', { endFrame, frameRate, refreshCanvas })
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
})
