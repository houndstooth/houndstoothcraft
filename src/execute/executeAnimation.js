import state from '../../state'
import codeUtilities from '../utilities/codeUtilities'
import animation from '../animation'

export default ({ layerFunctions, animationFunctions }) => {
	let { frameRate, refreshCanvas, startAnimationFrame, endAnimationFrame } = state.mainHoundstooth.basePattern.animationSettings || {}
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = codeUtilities.defaultToTrue(refreshCanvas)

	state.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = animation.buildAnimationFunction({ startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas })
	const stopConditionFunction = animation.buildStopConditionFunction({ endAnimationFrame })

	animation.animator({  animationFunction, frameRate, stopConditionFunction })
}
