const thisAnimationFrameOnly = frame => ({
	startAnimationFrame: frame,
	endAnimationFrame: frame,
})

const thisLayerOnly = frame => ({
	startLayer: frame,
	endLayer: frame,
})

export {
	thisAnimationFrameOnly,
	thisLayerOnly,
}