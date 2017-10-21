import { animator, buildAnimationFunction, buildStopConditionFunction } from '../animation'
import { defaults } from '../index'
import { state } from '../state'
import * as to from '../to'
import { defaultToTrue } from '../utilities/codeUtilities'
import { SettingsFunctionObject } from './types'

const executeAnimation: (_: {
	animationFunctionObjects: SettingsFunctionObject[], layerFunctionObjects: SettingsFunctionObject[],
}) => void = ({ animationFunctionObjects, layerFunctionObjects }) => {
	const { animationSettings } = state.mainHoundstooth.basePattern
	const {
		frameRate = defaults.DEFAULT_FRAME_RATE,
		endAnimationFrame = to.Frame(0),
		startAnimationFrame = to.Frame(0),
	} = animationSettings
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

export { executeAnimation }
