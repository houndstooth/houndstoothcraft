import executeAnimation from '../../../../src/execute/executeAnimation'
import * as animation from '../../../../src/animation'
import state from '../../../../src/state'
import noop from '../../../helpers/noop'

describe('execute animation', () => {
	let stopConditionFunction
	let animationFunction

	let layerFunctionObjects
	let animationFunctionObjects

	let frameRate
	let refreshCanvas
	let startAnimationFrame
	let endAnimationFrame

	beforeEach(() => {
		stopConditionFunction = noop
		animationFunction = noop

		spyOn(animation, 'animator')
		spyOn(animation, 'buildStopConditionFunction').and.returnValue(stopConditionFunction)
		spyOn(animation, 'buildAnimationFunction').and.returnValue(animationFunction)

		layerFunctionObjects = []
		animationFunctionObjects = []

		frameRate = 5
		startAnimationFrame = 3
		endAnimationFrame = 7
		refreshCanvas = false

		const basePattern = state.mainHoundstooth.basePattern || {}
		basePattern.animationSettings = {
			frameRate,
			refreshCanvas,
			startAnimationFrame,
			endAnimationFrame,
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
				startAnimationFrame,
				animationFunctionObjects,
				layerFunctionObjects,
			}),
		)
	})

	it('defaults refreshing the canvas to true', () => {
		const basePattern = state.mainHoundstooth.basePattern || {}
		const animationSettings = basePattern.animationSettings || {}
		animationSettings.refreshCanvas = undefined

		executeAnimation({ layerFunctionObjects, animationFunctionObjects })

		expect(animation.buildAnimationFunction).toHaveBeenCalledWith(
			jasmine.objectContaining({
				refreshCanvas: true,
			}),
		)
	})

	it('defaults the start animation frame to zero', () => {
		const basePattern = state.mainHoundstooth.basePattern || {}
		const animationSettings = basePattern.animationSettings || {}
		animationSettings.startAnimationFrame = undefined

		executeAnimation({ layerFunctionObjects, animationFunctionObjects })

		expect(animation.buildAnimationFunction).toHaveBeenCalledWith(
			jasmine.objectContaining({
				startAnimationFrame: 0,
			}),
		)
	})
})
