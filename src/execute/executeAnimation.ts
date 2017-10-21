import { animator, buildAnimationFunction, buildStopConditionFunction, Frame } from '../animation'
import { state } from '../state'
import { AnimationSettings, getSetting } from '../store'
import { defaultToTrue } from '../utilities/codeUtilities'
import { SettingsFunctionObject } from './types'

const executeAnimation: (_: {
	animationFunctionObjects: SettingsFunctionObject[], layerFunctionObjects: SettingsFunctionObject[],
}) => void = ({ animationFunctionObjects, layerFunctionObjects }) => {
	const { frameRate, endAnimationFrame }: AnimationSettings = getSetting('animation')
	const startAnimationFrame: Frame = getSetting('startAnimationFrame')
	let refreshCanvas: boolean = getSetting('refreshCanvas')
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
