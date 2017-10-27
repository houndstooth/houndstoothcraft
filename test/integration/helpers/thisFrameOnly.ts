import { Frame } from '../../../src/animation'
import { Layer } from '../../../src/execute'

interface ThisFrameOnly { endFrame: Frame, startFrame: Frame }

const thisFrameOnly: (frame: Frame) => ThisFrameOnly =
	(frame: Frame): ThisFrameOnly => ({
		endFrame: frame,
		startFrame: frame,
	})

interface ThisLayerOnly { endLayer: Layer, startLayer: Layer }

const thisLayerOnly: (layer: Layer) => ThisLayerOnly =
	(layer: Layer): ThisLayerOnly => ({
		endLayer: layer,
		startLayer: layer,
	})

export {
	thisFrameOnly,
	thisLayerOnly,
}
