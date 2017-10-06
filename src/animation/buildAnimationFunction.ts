import state from '../state'
import { callFunctionsPerSetting, executeGrid } from '../execute'
import { clear } from '../canvas'
import exportFrame from './exportFrame'
import { deepClone } from '../utilities/codeUtilities'

const buildAnimationFunction = ({ startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas }) => () => {
	if (state.exportFrames && state.currentAnimationFrame > state.lastSavedAnimationFrame) return

	if (state.currentAnimationFrame >= startAnimationFrame) {
		if (refreshCanvas) clear()

		const preLayerSettings = deepClone(state.mainHoundstooth.basePattern)
		executeGrid({ layerFunctions })
		Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

		if (state.exportFrames) exportFrame()
	}

	callFunctionsPerSetting({ settingsFunctions: animationFunctions })
	state.currentAnimationFrame++
}

export default buildAnimationFunction
