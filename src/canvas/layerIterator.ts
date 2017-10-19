import { Layer } from '../execute'
import { state } from '../state'
import { iterator } from '../utilities/codeUtilities'

const layerIterator: () => Layer[] = () => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const layerSettings = basePattern.layerSettings
	const endLayer = layerSettings && layerSettings.endLayer || 0
	const layerCount = endLayer + 1

	return iterator(layerCount) as any
}

export { layerIterator }
