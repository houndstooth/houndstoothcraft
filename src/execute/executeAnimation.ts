import state from '../state'
import { defaultToTrue } from '../utilities/codeUtilities'
import { animator, buildAnimationFunction, buildStopConditionFunction } from '../animation'
import { SettingsFunctionObject } from './types'
import { defaults } from '../index'

const executeAnimation: {
	({}: { layerFunctionObjects: SettingsFunctionObject[], animationFunctionObjects: SettingsFunctionObject[] }): void,
} = ({ layerFunctionObjects, animationFunctionObjects }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const animationSettings = basePattern.animationSettings || {}
	const { frameRate = defaults.DEFAULT_FRAME_RATE, endAnimationFrame = 0, startAnimationFrame = 0 } = animationSettings
	let { refreshCanvas } = animationSettings
	refreshCanvas = !!defaultToTrue(refreshCanvas)

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
