import {
	animator,
	buildAnimationFunction,
	buildStopConditionFunction,
	ConditionFunction,
	executeAnimation,
	Frame,
	setSetting,
	SettingsFunctionObject,
	to,
} from '../../../../../src'

describe('execute animation', () => {
	const stopConditionFunction: ConditionFunction = (): boolean => false
	const animationFunction: (p: number) => number = (p: number): number => p

	let layerFunctionObjects: SettingsFunctionObject[]
	let animationFunctionObjects: SettingsFunctionObject[]

	let frameRate: number
	let refreshCanvas: boolean
	let startFrame: Frame
	let endFrame: Frame

	beforeEach(() => {
		spyOn(animator, 'default')
		spyOn(buildStopConditionFunction, 'default').and.returnValue(stopConditionFunction)
		spyOn(buildAnimationFunction, 'default').and.returnValue(animationFunction)
	})

	describe('configured', () => {
		beforeEach(() => {
			layerFunctionObjects = []
			animationFunctionObjects = []

			frameRate = 5
			startFrame = to.Frame(3)
			endFrame = to.Frame(7)
			refreshCanvas = false

			setSetting.default('animationSettings', { endFrame, frameRate, refreshCanvas, startFrame })
		})

		it('calls the animator', () => {
			executeAnimation.default({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(animator.default).toHaveBeenCalledWith(jasmine.objectContaining({
				animationFunction,
				frameRate,
				stopConditionFunction,
			}))
		})

		it('builds a stop condition function', () => {
			executeAnimation.default({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(buildStopConditionFunction.default).toHaveBeenCalledWith({
				endFrame,
			})
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
