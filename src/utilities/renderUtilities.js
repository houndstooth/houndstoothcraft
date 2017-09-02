import store from '../../store'

const clipPath = ({ context }) => context.clip()

const resetClip = ({ context }) => {
	const entireCanvas = [
		[ 0, 0 ],
		[ context.width, 0 ],
		[ context.width, context.height ],
		[ 0, context.height ],
	]
	buildPath({ context, outline: entireCanvas })
	clipPath({ context })
}

const buildPath = ({ context, outline }) => {
	context.beginPath()
	context.moveTo(outline[ 0 ][ 0 ], outline[ 0 ][ 1 ])
	outline.slice(1).forEach(coordinate => context.lineTo(coordinate[ 0 ], coordinate[ 1 ]))
}

const fillPath = ({ context }) => {
	context.closePath()
	context.fill()
}

const getCurrentContext = () => store.contexts[store.currentLayer]

export default {
	clipPath,
	resetClip,
	buildPath,
	fillPath,
	getCurrentContext,
}
