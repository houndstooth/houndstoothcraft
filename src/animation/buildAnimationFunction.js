import store from '../../store'
import execute from '../execute'
import display from '../display'
import animation from '../animation'
import codeUtilities from '../utilities/codeUtilities'

export default ({ startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas }) => () => {
	if (store.exportFrames && store.currentAnimationFrame > store.lastSavedAnimationFrame) return

	if (store.currentAnimationFrame >= startAnimationFrame) {
		if (refreshCanvas) display.clear()

		const preLayerSettings = codeUtilities.deepClone(store.mainHoundstooth.basePattern)
		execute.executeGrid({ layerFunctions })
		Object.assign(store.mainHoundstooth.basePattern, preLayerSettings)

		if (store.exportFrames) animation.exportFrame()
	}

	execute.callFunctionsPerSetting({ settingsFunctions: animationFunctions })
	store.currentAnimationFrame++
}
