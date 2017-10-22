import { animator, buildAnimationFunction, buildStopConditionFunction } from '../animation'
import { state } from '../state'
import { AnimationSettings, getFromBaseOrDefaultPattern } from '../store'
import { SettingsFunctionObject } from './types'

const executeAnimation: (_: {
	animationFunctionObjects: SettingsFunctionObject[], layerFunctionObjects: SettingsFunctionObject[],
}) => void = ({ animationFunctionObjects, layerFunctionObjects }) => {
	const {
		frameRate,
		endAnimationFrame,
		startAnimationFrame,
		refreshCanvas,
	}: AnimationSettings = getFromBaseOrDefaultPattern('animationSettings')

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
