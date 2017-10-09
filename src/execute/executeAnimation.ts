import state from '../state'
import { defaultToTrue } from '../utilities/codeUtilities'
import { animator, buildAnimationFunction, buildStopConditionFunction } from '../animation'

const executeAnimation = ({ layerFunctions, animationFunctions }) => {
	const {
		frameRate,
		endAnimationFrame,
	} : {
		frameRate,
		endAnimationFrame
		} = state.mainHoundstooth.basePattern.animationSettings || {}
	let {
		startAnimationFrame,
		refreshCanvas,
	} : {
		refreshCanvas?,
		startAnimationFrame?
		} = state.mainHoundstooth.basePattern.animationSettings || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = defaultToTrue(refreshCanvas)

	state.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = buildAnimationFunction({
		startAnimationFrame,
		animationFunctions,
		layerFunctions,
		refreshCanvas,
	})
	const stopConditionFunction = buildStopConditionFunction({ endAnimationFrame })

	animator({ animationFunction, frameRate, stopConditionFunction })
}

export default executeAnimation
