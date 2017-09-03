import store from '../../store'

const clipPath = ({ context }) => {
	context.save()
	context.clip()
}

const resetClip = ({ context }) => context.restore()

const buildPath = ({ context, outline }) => {
	context.beginPath()
	context.moveTo(outline[ 0 ][ 0 ], outline[ 0 ][ 1 ])
	outline.slice(1).forEach(coordinate => context.lineTo(coordinate[ 0 ], coordinate[ 1 ]))
}

const fillPath = ({ context }) => {
	context.closePath()
	context.fill()
}

const getCurrentContext = () => store.contexts[ store.currentLayer ]

export default {
	clipPath,
	resetClip,
	buildPath,
	fillPath,
	getCurrentContext,
}
