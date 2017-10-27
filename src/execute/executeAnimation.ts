import { animator, buildAnimationFunction, buildStopConditionFunction } from '../animation'
import { state } from '../state'
import { AnimationSettings, getFromBaseOrDefaultPattern } from '../store'
import { SettingsFunctionObject } from './types'

const executeAnimation: (_: {
	animationFunctionObjects: SettingsFunctionObject[], layerFunctionObjects: SettingsFunctionObject[],
}) => void = ({ animationFunctionObjects, layerFunctionObjects }) => {
	const {
		frameRate,
		endFrame,
		startFrame,
		refreshCanvas,
	}: AnimationSettings = getFromBaseOrDefaultPattern('animationSettings')

	state.lastSavedFrame = startFrame

	const animationFunction = buildAnimationFunction({
		animationFunctionObjects,
		layerFunctionObjects,
		refreshCanvas,
		startFrame,
	})
	const stopConditionFunction = buildStopConditionFunction({ endFrame })

	animator({ animationFunction, frameRate, stopConditionFunction })
}

export { executeAnimation }
