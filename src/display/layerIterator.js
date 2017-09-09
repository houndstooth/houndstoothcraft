import state from '../../state'
import codeUtilities from '../utilities/codeUtilities'

export default () => {
	const layerSettings = state.mainHoundstooth.basePattern.layerSettings
	const endLayer = layerSettings && layerSettings.endLayer || 0
	const layerCount = endLayer + 1

	return codeUtilities.iterator(layerCount)
}
