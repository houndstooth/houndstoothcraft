import state from '../state'
import { callFunctionsPerSetting, executeGrid, SettingsFunctionObject } from '../execute'
import { clear } from '../canvas'
import { deepClone } from '../utilities/codeUtilities'
import exportFrame from './exportFrame'

const buildAnimationFunction: {
	({}: {
		animationFunctionObjects: SettingsFunctionObject[],
		layerFunctionObjects: SettingsFunctionObject[],
		refreshCanvas: boolean,
		startAnimationFrame: number,
	}): () => void,
} = ({ animationFunctionObjects, layerFunctionObjects, refreshCanvas, startAnimationFrame }) => () => {
	if (exportingFramesStillNeedsToCatchUp()) {
		return
	}

	if (shouldBeginShowingAnimation(startAnimationFrame)) {
		animate({ layerFunctionObjects, refreshCanvas })
	}

	callFunctionsPerSetting({ settingsFunctionObjects: animationFunctionObjects })
	state.currentAnimationFrame++
}

const exportingFramesStillNeedsToCatchUp: { (): boolean } = () =>
	state.exportFrames && state.currentAnimationFrame > state.lastSavedAnimationFrame

const shouldBeginShowingAnimation: { (startAnimationFrame: number): boolean } = startAnimationFrame =>
	state.currentAnimationFrame >= startAnimationFrame

const animate: {
	({}: { layerFunctionObjects: SettingsFunctionObject[], refreshCanvas: boolean }): void,
} = ({ layerFunctionObjects, refreshCanvas }) => {
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

export default buildAnimationFunction
