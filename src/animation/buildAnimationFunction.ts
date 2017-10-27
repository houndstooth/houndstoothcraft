import { clear } from '../canvas'
import { callFunctionsPerSetting, executeGrid, SettingsFunctionObject } from '../execute'
import { state } from '../state'
import { deepClone } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { exportFrame } from './exportFrame'
import { Frame } from './types'
import { ConditionFunction } from './types/ConditionFunction'

const buildAnimationFunction: (_: {
	animationFunctionObjects: SettingsFunctionObject[],
	layerFunctionObjects: SettingsFunctionObject[],
	refreshCanvas: boolean,
	startFrame: Frame,
}) => () => void = ({ animationFunctionObjects, layerFunctionObjects, refreshCanvas, startFrame }) => () => {
	if (exportingFramesStillNeedsToCatchUp()) {
		return
	}

	if (shouldBeginShowingAnimation(startFrame)) {
		animate({ layerFunctionObjects, refreshCanvas })
	}

	callFunctionsPerSetting({ settingsFunctionObjects: animationFunctionObjects })
	state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
}

const exportingFramesStillNeedsToCatchUp: ConditionFunction = () =>
	state.exportFrames && state.currentFrame > state.lastSavedFrame

const shouldBeginShowingAnimation: (startFrame: Frame) => boolean = startFrame =>
	state.currentFrame >= startFrame

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
