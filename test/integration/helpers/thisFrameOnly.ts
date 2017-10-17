const thisAnimationFrameOnly: (frame: number) => { endAnimationFrame: number, startAnimationFrame: number } =
	frame => ({
		endAnimationFrame: frame,
		startAnimationFrame: frame,
	})

const thisLayerOnly: (frame: number) => { endLayer: number, startLayer: number } = frame => ({
	endLayer: frame,
	startLayer: frame,
})

export {
	thisAnimationFrameOnly,
	thisLayerOnly,
}
