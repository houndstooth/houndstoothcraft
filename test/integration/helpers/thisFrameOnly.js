const thisAnimationFrameOnly = frame => ({
	startAnimationFrame: frame,
	endAnimationFrame: frame,
})

const thisIterationFrameOnly = frame => ({
	startIterationFrame: frame,
	endIterationFrame: frame,
})

export default {
	thisAnimationFrameOnly,
	thisIterationFrameOnly,
}
