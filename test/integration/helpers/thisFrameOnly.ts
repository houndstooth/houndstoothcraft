import { Frame } from '../../../src/animation/types/Frame'
import { Layer } from '../../../src/execute/types/Layer'

const thisAnimationFrameOnly: (frame: Frame) => { endAnimationFrame: Frame, startAnimationFrame: Frame } =
	(frame: Frame) => ({
		endAnimationFrame: frame,
		startAnimationFrame: frame,
	})

const thisLayerOnly: (layer: Layer) => { endLayer: Layer, startLayer: Layer } =
	(layer: Layer) => ({
		endLayer: layer,
		startLayer: layer,
	})

export {
	thisAnimationFrameOnly,
	thisLayerOnly,
}
