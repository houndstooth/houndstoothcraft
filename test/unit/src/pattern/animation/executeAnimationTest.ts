import {
	animator,
	buildAnimationFunction,
	buildStopConditionFunction,
	ConditionFunction,
	executeAnimation,
	Frame,
	setSetting,
	SettingsFunctionObject,
	state,
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
		spyOn(buildStopConditionFunction, 'main').and.returnValue(stopConditionFunction)
		spyOn(buildAnimationFunction, 'main').and.returnValue(animationFunction)
	})

	describe('configured', () => {
		beforeEach(() => {
			layerFunctionObjects = []
			animationFunctionObjects = []

			frameRate = 5
			startFrame = to.Frame(3)
			endFrame = to.Frame(7)
			refreshCanvas = false

			setSetting.main('animationSettings', { endFrame, frameRate, refreshCanvas, startFrame })
		})

		it('calls the animator', () => {
			executeAnimation.main({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(animator.default).toHaveBeenCalledWith(jasmine.objectContaining({
				animationFunction,
				frameRate,
				stopConditionFunction,
			}))
		})

		it('initializes the last saved animation frame to the start animation frame', () => {
			executeAnimation.main({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(state.lastSavedFrame).toBe(startFrame)
		})

		it('builds a stop condition function', () => {
			executeAnimation.main({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(buildStopConditionFunction.main).toHaveBeenCalledWith({
				endFrame,
			})
		})

		it('builds an animation function', () => {
			executeAnimation.main({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(buildAnimationFunction.main).toHaveBeenCalledWith(
				jasmine.objectContaining({
					animationFunctionObjects,
					layerFunctionObjects,
				}),
			)
		})
	})
})
