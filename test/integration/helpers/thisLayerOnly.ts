import { Layer } from '../../../src'
import { ThisLayerOnly } from './types'

const thisLayerOnly: (layer: Layer) => ThisLayerOnly =
	(layer: Layer): ThisLayerOnly => ({
		endLayer: layer,
		startLayer: layer,
	})

export default thisLayerOnly
