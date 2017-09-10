import state from '../../state'
import execute from '../execute'
import display from '../display'
import exportFrame from './exportFrame'
import codeUtilities from '../utilities/codeUtilities'

export default ({ startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas }) => () => {
	if (state.exportFrames && state.currentAnimationFrame > state.lastSavedAnimationFrame) return

	if (state.currentAnimationFrame >= startAnimationFrame) {
		if (refreshCanvas) display.clear()

		const preLayerSettings = codeUtilities.deepClone(state.mainHoundstooth.basePattern)
		execute.executeGrid({ layerFunctions })
		Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

		if (state.exportFrames) exportFrame()
	}

	execute.callFunctionsPerSetting({ settingsFunctions: animationFunctions })
	state.currentAnimationFrame++
}
