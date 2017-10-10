import state from '../state'
import { iterator } from '../utilities/codeUtilities'

const layerIterator: { (): number[] } = () => {
	const layerSettings = state.mainHoundstooth.basePattern.layerSettings
	const endLayer = layerSettings && layerSettings.endLayer || 0
	const layerCount = endLayer + 1

	return iterator(layerCount)
}

export default layerIterator
