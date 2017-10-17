import { animator, buildAnimationFunction, buildStopConditionFunction } from '../animation'
import { defaults } from '../index'
import state from '../state'
import { defaultToTrue } from '../utilities/codeUtilities'
import { SettingsFunctionObject } from './types'

const executeAnimation: (_: {
	animationFunctionObjects: SettingsFunctionObject[], layerFunctionObjects: SettingsFunctionObject[],
}) => void = ({ animationFunctionObjects, layerFunctionObjects }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const animationSettings = basePattern.animationSettings || {}
	const { frameRate = defaults.DEFAULT_FRAME_RATE, endAnimationFrame = 0, startAnimationFrame = 0 } = animationSettings
	let { refreshCanvas } = animationSettings
	refreshCanvas = !!defaultToTrue(refreshCanvas)

	state.lastSavedAnimationFrame = startAnimationFrame

	const animationFunction = buildAnimationFunction({
		animationFunctionObjects,
		layerFunctionObjects,
		refreshCanvas,
		startAnimationFrame,
	})
	const stopConditionFunction = buildStopConditionFunction({ endAnimationFrame })

	animator({ animationFunction, frameRate, stopConditionFunction })
}

export default executeAnimation
