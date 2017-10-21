import { Layer } from '../execute'
import { state } from '../state'
import { defaults } from '../store'
import * as to from '../to'
import { iterator } from '../utilities/codeUtilities'

const layerIterator: () => Layer[] = () => {
	const endLayer = state.mainHoundstooth.basePattern.layerSettings.endLayer || defaults.DEFAULT_END_LAYER
	const layerCount = endLayer + 1

	return to.Layers(iterator(layerCount))
}

export { layerIterator }
