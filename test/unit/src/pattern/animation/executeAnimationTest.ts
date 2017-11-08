import { SettingsFunctionObject } from '../../../../../src/app/execute'
import { setSetting } from '../../../../../src/app/store/setSetting'
import * as animator from '../../../../../src/pattern/animation/animator'
import * as buildAnimationFunction from '../../../../../src/pattern/animation/buildAnimationFunction'
import * as buildStopConditionFunction from '../../../../../src/pattern/animation/buildStopConditionFunction'
import { executeAnimation } from '../../../../../src/pattern/animation/executeAnimation'
import { ConditionFunction, Frame } from '../../../../../src/pattern/animation/types'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'

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
		spyOn(buildStopConditionFunction, 'buildStopConditionFunction').and.returnValue(stopConditionFunction)
		spyOn(buildAnimationFunction, 'buildAnimationFunction').and.returnValue(animationFunction)
	})

	describe('configured', () => {
		beforeEach(() => {
			layerFunctionObjects = []
			animationFunctionObjects = []

			frameRate = 5
			startFrame = to.Frame(3)
			endFrame = to.Frame(7)
			refreshCanvas = false

			setSetting('animationSettings', { endFrame, frameRate, refreshCanvas, startFrame })
		})

		it('calls the animator', () => {
			executeAnimation({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(animator.default).toHaveBeenCalledWith(jasmine.objectContaining({
				animationFunction,
				frameRate,
				stopConditionFunction,
			}))
		})

		it('initializes the last saved animation frame to the start animation frame', () => {
			executeAnimation({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(state.lastSavedFrame).toBe(startFrame)
		})

		it('builds a stop condition function', () => {
			executeAnimation({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(buildStopConditionFunction.buildStopConditionFunction).toHaveBeenCalledWith({
				endFrame,
			})
		})

		it('builds an animation function', () => {
			executeAnimation({ layerFunctionObjects, animationFunctionObjects }).then().catch()

			expect(buildAnimationFunction.buildAnimationFunction).toHaveBeenCalledWith(
				jasmine.objectContaining({
					animationFunctionObjects,
					layerFunctionObjects,
				}),
			)
		})
	})
})
