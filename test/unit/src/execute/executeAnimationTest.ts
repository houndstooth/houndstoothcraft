import * as animation from '../../../../src/animation'
import { Frame } from '../../../../src/animation/types/Frame'
import { executeAnimation } from '../../../../src/execute/executeAnimation'
import { SettingsFunctionObject } from '../../../../src/execute/types/SettingsFunctionObject'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'

describe('execute animation', () => {
	const stopConditionFunction: () => boolean = () => false
	const animationFunction: (p: number) => number = (p: number): number => p

	let layerFunctionObjects: SettingsFunctionObject[]
	let animationFunctionObjects: SettingsFunctionObject[]

	let frameRate: number
	let refreshCanvas: boolean
	let startAnimationFrame: Frame
	let endAnimationFrame: Frame

	beforeEach(() => {
		spyOn(animation, 'animator')
		spyOn(animation, 'buildStopConditionFunction').and.returnValue(stopConditionFunction)
		spyOn(animation, 'buildAnimationFunction').and.returnValue(animationFunction)
	})

	describe('configured', () => {
		beforeEach(() => {
			layerFunctionObjects = []
			animationFunctionObjects = []

			frameRate = 5
			startAnimationFrame = to.Frame(3)
			endAnimationFrame = to.Frame(7)
			refreshCanvas = false

			state.mainHoundstooth.basePattern.animationSettings = {
				endAnimationFrame,
				frameRate,
				refreshCanvas,
				startAnimationFrame,
			}
		})

		it('calls the animator', () => {
			executeAnimation({ layerFunctionObjects, animationFunctionObjects })

			expect(animation.animator).toHaveBeenCalledWith({
				animationFunction,
				frameRate,
				stopConditionFunction,
			})
		})

		it('initializes the last saved animation frame to the start animation frame', () => {
			executeAnimation({ layerFunctionObjects, animationFunctionObjects })

			expect(state.lastSavedAnimationFrame).toBe(startAnimationFrame)
		})

		it('builds a stop condition function', () => {
			executeAnimation({ layerFunctionObjects, animationFunctionObjects })

			expect(animation.buildStopConditionFunction).toHaveBeenCalledWith({
				endAnimationFrame,
			})
		})

		it('builds an animation function', () => {
			executeAnimation({ layerFunctionObjects, animationFunctionObjects })

			expect(animation.buildAnimationFunction).toHaveBeenCalledWith(
				jasmine.objectContaining({
					animationFunctionObjects,
					layerFunctionObjects,
					startAnimationFrame,
				}),
			)
		})
	})

	it('defaults refreshing the canvas to true', () => {
		executeAnimation({ layerFunctionObjects, animationFunctionObjects })

		expect(animation.buildAnimationFunction).toHaveBeenCalledWith(
			jasmine.objectContaining({
				refreshCanvas: true,
			}),
		)
	})

	it('defaults the start animation frame to zero', () => {
		executeAnimation({ layerFunctionObjects, animationFunctionObjects })

		expect(animation.buildAnimationFunction).toHaveBeenCalledWith(
			jasmine.objectContaining({
				startAnimationFrame: 0,
			}),
		)
	})
})
