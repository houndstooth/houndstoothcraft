type ThisAnimationFrameOnly = { (frame: number): { startAnimationFrame: number, endAnimationFrame: number } }

const thisAnimationFrameOnly: ThisAnimationFrameOnly = frame => ({
	startAnimationFrame: frame,
	endAnimationFrame: frame,
})

const thisLayerOnly: { (frame: number): { startLayer: number, endLayer: number } } = frame => ({
	startLayer: frame,
	endLayer: frame,
})

export {
	thisAnimationFrameOnly,
	thisLayerOnly,
}
