import { clear } from '../canvas'
import { callFunctionsPerSetting, executeGrid, SettingsFunctionObject } from '../execute'
import { state } from '../state'
import { deepClone } from '../utilities/codeUtilities'
import { exportFrame } from './exportFrame'
import { Frame } from './types'

const buildAnimationFunction: (_: {
	animationFunctionObjects: SettingsFunctionObject[],
	layerFunctionObjects: SettingsFunctionObject[],
	refreshCanvas: boolean,
	startAnimationFrame: Frame,
}) => () => void = ({ animationFunctionObjects, layerFunctionObjects, refreshCanvas, startAnimationFrame }) => () => {
	if (exportingFramesStillNeedsToCatchUp()) {
		return
	}

	if (shouldBeginShowingAnimation(startAnimationFrame)) {
		animate({ layerFunctionObjects, refreshCanvas })
	}

	callFunctionsPerSetting({ settingsFunctionObjects: animationFunctionObjects })
	state.currentAnimationFrame++
}

const exportingFramesStillNeedsToCatchUp: () => boolean = () =>
	state.exportFrames && state.currentAnimationFrame > state.lastSavedAnimationFrame

const shouldBeginShowingAnimation: (startAnimationFrame: Frame) => boolean = startAnimationFrame =>
	state.currentAnimationFrame >= startAnimationFrame

const animate: (_: {
	layerFunctionObjects: SettingsFunctionObject[], refreshCanvas: boolean,
}) => void = ({ layerFunctionObjects, refreshCanvas }) => {
	if (refreshCanvas) {
		clear()
	}

	const preLayerSettings = deepClone(state.mainHoundstooth.basePattern)
	executeGrid({ layerFunctionObjects })
	Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

	if (state.exportFrames) {
		exportFrame()
	}
}

export { buildAnimationFunction }
