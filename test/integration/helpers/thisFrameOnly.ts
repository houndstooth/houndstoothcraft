import { Frame } from '../../../src/animation'
import { Layer } from '../../../src/execute'

interface ThisFrameOnly {
	readonly endFrame: Frame,
	readonly startFrame: Frame
}

const thisFrameOnly: (frame: Frame) => ThisFrameOnly =
	(frame: Frame): ThisFrameOnly => ({
		endFrame: frame,
		startFrame: frame,
	})

interface ThisLayerOnly {
	readonly endLayer: Layer,
	readonly startLayer: Layer
}

const thisLayerOnly: (layer: Layer) => ThisLayerOnly =
	(layer: Layer): ThisLayerOnly => ({
		endLayer: layer,
		startLayer: layer,
	})

export {
	thisFrameOnly,
	thisLayerOnly,
}
