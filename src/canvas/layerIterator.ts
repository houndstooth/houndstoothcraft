import { Layer } from '../execute'
import * as from from '../from'
import { getSetting } from '../store'
import * as to from '../to'
import { iterator } from '../utilities/codeUtilities'

const layerIterator: () => Layer[] = () => {
	const endLayer: Layer = getSetting('endLayer')

	const layerCount = from.Layer(endLayer) + 1

	return to.Layers(iterator(layerCount))
}

export { layerIterator }
