// tslint:disable:no-any

import { LayerSettings } from './layerSettings'
import { Layer } from './types'

const DEFAULT_END_LAYER: Layer = 0 as any

const DEFAULT_LAYER_SETTINGS: LayerSettings = {
	endLayer: DEFAULT_END_LAYER,
}

export {
	DEFAULT_LAYER_SETTINGS,
}
