import { Frame } from '../../../src/animation/types/Frame'
import { Layer } from '../../../src/execute/types/Layer'

const thisAnimationFrameOnly: (frame: Frame) => { endAnimationFrame: Frame, startAnimationFrame: Frame } =
	frame => ({
		endAnimationFrame: frame,
		startAnimationFrame: frame,
	}) as any

const thisLayerOnly: (layer: Layer) => { endLayer: Layer, startLayer: Layer } =
	layer => ({
		endLayer: layer,
		startLayer: layer,
	}) as any

export {
	thisAnimationFrameOnly,
	thisLayerOnly,
}
