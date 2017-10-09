import state from '../state'
import { callFunctionsPerSetting, executeGrid } from '../execute'
import { clear } from '../canvas'
import { deepClone } from '../utilities/codeUtilities'
import exportFrame from './exportFrame'

const buildAnimationFunction = ({ startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas }) => () => {
	if (exportingFramesStillNeedsToCatchUp()) {
		return
	}

	if (beginningOfAnimationThatShouldBeSeenHasBeenReached(startAnimationFrame)) {
		animate({ layerFunctions, refreshCanvas })
	}

	callFunctionsPerSetting({ settingsFunctions: animationFunctions })
	state.currentAnimationFrame++
}

const exportingFramesStillNeedsToCatchUp = () => {
	return state.exportFrames && state.currentAnimationFrame > state.lastSavedAnimationFrame
}

const beginningOfAnimationThatShouldBeSeenHasBeenReached = startAnimationFrame => {
	return state.currentAnimationFrame >= startAnimationFrame
}

const animate = ({ layerFunctions, refreshCanvas }) => {
	if (refreshCanvas) {
		clear()
	}

	const preLayerSettings = deepClone(state.mainHoundstooth.basePattern)
	executeGrid({ layerFunctions })
	Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

	if (state.exportFrames) {
		exportFrame()
	}
}

export default buildAnimationFunction
