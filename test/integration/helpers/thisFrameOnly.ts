import { Frame } from '../../../src/animation'
import { Layer } from '../../../src/execute'
import { ThisFrameOnly, ThisLayerOnly } from './types'

const thisFrameOnly: (frame: Frame) => ThisFrameOnly =
	(frame: Frame): ThisFrameOnly => ({
		endFrame: frame,
		startFrame: frame,
	})

const thisLayerOnly: (layer: Layer) => ThisLayerOnly =
	(layer: Layer): ThisLayerOnly => ({
		endLayer: layer,
		startLayer: layer,
	})

export {
	thisFrameOnly,
	thisLayerOnly,
}
