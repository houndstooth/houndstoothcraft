import state from '../state'
import { callFunctionsPerSetting, executeGrid } from '../execute'
import { clear } from '../canvas'
import { deepClone } from '../utilities/codeUtilities'
import { SettingsFunctionObject } from '../execute'
import exportFrame from './exportFrame'

type BuildAnimationFunction = {
	({}: {
		startAnimationFrame: number,
		animationFunctionObjects: SettingsFunctionObject[],
		layerFunctionObjects: SettingsFunctionObject[],
		refreshCanvas: boolean,
	}): () => void,
}
const buildAnimationFunction: BuildAnimationFunction = params => {
	const { startAnimationFrame, animationFunctionObjects, layerFunctionObjects, refreshCanvas } = params
	return () => {
		if (exportingFramesStillNeedsToCatchUp()) {
			return
		}

		if (shouldBeginShowingAnimation(startAnimationFrame)) {
			animate({ layerFunctionObjects, refreshCanvas })
		}

		callFunctionsPerSetting({ settingsFunctionObjects: animationFunctionObjects })
		state.currentAnimationFrame++
	}
}

const exportingFramesStillNeedsToCatchUp: { (): boolean } = () => {
	return state.exportFrames && state.currentAnimationFrame > state.lastSavedAnimationFrame
}

const shouldBeginShowingAnimation: { (startAnimationFrame: number): boolean } = startAnimationFrame => {
	return state.currentAnimationFrame >= startAnimationFrame
}

type Animate = { ({}: { layerFunctionObjects: SettingsFunctionObject[], refreshCanvas: boolean }): void }
const animate: Animate = ({ layerFunctionObjects, refreshCanvas }) => {
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
