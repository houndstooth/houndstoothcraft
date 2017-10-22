import { animator, buildAnimationFunction, buildStopConditionFunction, Frame } from '../animation'
import { state } from '../state'
import { AnimationSettings, getFromBaseOrDefaultPattern } from '../store'
import { defaultToTrue } from '../utilities/codeUtilities'
import { SettingsFunctionObject } from './types'

const executeAnimation: (_: {
	animationFunctionObjects: SettingsFunctionObject[], layerFunctionObjects: SettingsFunctionObject[],
}) => void = ({ animationFunctionObjects, layerFunctionObjects }) => {
	const { frameRate, endAnimationFrame }: AnimationSettings = getFromBaseOrDefaultPattern('animation')
	const startAnimationFrame: Frame = getFromBaseOrDefaultPattern('startAnimationFrame')
	let refreshCanvas: boolean = getFromBaseOrDefaultPattern('refreshCanvas')
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
