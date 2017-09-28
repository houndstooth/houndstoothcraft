import executeAnimation from '../../../../src/execute/executeAnimation'
import * as animation from '../../../../src/animation'
import resetState from '../../../../src/store/resetState'
import state from '../../../../src/state'
import noop from '../../../helpers/noop'

describe('execute animation', () => {
	let stopConditionFunction
	let animationFunction

	let layerFunctions
	let animationFunctions

	let frameRate
	let refreshCanvas
	let startAnimationFrame
	let endAnimationFrame

	beforeEach(() => {
		resetState(state)

		stopConditionFunction = noop
		animationFunction = noop

		spyOn(animation, 'animator')
		spyOn(animation, 'buildStopConditionFunction').and.returnValue(stopConditionFunction)
		spyOn(animation, 'buildAnimationFunction').and.returnValue(animationFunction)

		layerFunctions = []
		animationFunctions = []

		frameRate = 5
		startAnimationFrame = 3
		endAnimationFrame = 7
		refreshCanvas = false

		state.mainHoundstooth.basePattern.animationSettings = {
			frameRate,
			refreshCanvas,
			startAnimationFrame,
			endAnimationFrame,
		}
	})

	it('calls the animator', () => {
		executeAnimation({ layerFunctions, animationFunctions })

		expect(animation.animator).toHaveBeenCalledWith({
			animationFunction,
			frameRate,
			stopConditionFunction,
		})
	})

	it('initializes the last saved animation frame to the start animation frame', () => {
		executeAnimation({ layerFunctions, animationFunctions })

		expect(state.lastSavedAnimationFrame).toBe(startAnimationFrame)
	})

	it('builds a stop condition function', () => {
		executeAnimation({ layerFunctions, animationFunctions })

		expect(animation.buildStopConditionFunction).toHaveBeenCalledWith({
			endAnimationFrame,
		})
	})

	it('builds an animation function', () => {
		executeAnimation({ layerFunctions, animationFunctions })

		expect(animation.buildAnimationFunction).toHaveBeenCalledWith(
			jasmine.objectContaining({
				startAnimationFrame,
				animationFunctions,
				layerFunctions,
			})
		)
	})

	it('defaults refreshing the canvas to true', () => {
		state.mainHoundstooth.basePattern.animationSettings.refreshCanvas = undefined

		executeAnimation({ layerFunctions, animationFunctions })

		expect(animation.buildAnimationFunction).toHaveBeenCalledWith(
			jasmine.objectContaining({
				refreshCanvas: true,
			})
		)
	})

	it('defaults the start animation frame to zero', () => {
		state.mainHoundstooth.basePattern.animationSettings.startAnimationFrame = undefined

		executeAnimation({ layerFunctions, animationFunctions })

		expect(animation.buildAnimationFunction).toHaveBeenCalledWith(
			jasmine.objectContaining({
				startAnimationFrame: 0,
			})
		)
	})
})
