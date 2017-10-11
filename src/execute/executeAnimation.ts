import state from '../state'
import { defaultToTrue } from '../utilities/codeUtilities'
import { animator, buildAnimationFunction, buildStopConditionFunction } from '../animation'
import SettingsFunctionObject from './SettingsFunctionObject'

type ExecuteAnimation = {
	({}: { layerFunctionObjects: SettingsFunctionObject[], animationFunctionObjects: SettingsFunctionObject[] }): void,
}
const executeAnimation: ExecuteAnimation = ({ layerFunctionObjects, animationFunctionObjects }) => {
	const animationSettings = state.mainHoundstooth.basePattern.animationSettings || {}
	const { frameRate, endAnimationFrame } = animationSettings
	let { startAnimationFrame, refreshCanvas } = animationSettings
	startAnimationFrame = startAnimationFrame || 0
	refreshCanvas = defaultToTrue(refreshCanvas)

	state.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = buildAnimationFunction({
		startAnimationFrame,
		animationFunctionObjects,
		layerFunctionObjects,
		refreshCanvas,
	})
	const stopConditionFunction = buildStopConditionFunction({ endAnimationFrame })

	animator({ animationFunction, frameRate, stopConditionFunction })
}

export default executeAnimation
