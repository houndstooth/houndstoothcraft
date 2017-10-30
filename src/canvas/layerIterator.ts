import { Layer } from '../execute'
import { getFromBaseOrDefaultPattern } from '../store'
import { iterator } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'

const layerIterator: () => Layer[] =
	(): Layer[] => {
		const endLayer: Layer = getFromBaseOrDefaultPattern('endLayer')

		const layerCount: number = from.Layer(endLayer) + 1

		return to.Layers(iterator(layerCount))
	}

export { layerIterator }
