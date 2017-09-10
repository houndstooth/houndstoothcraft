import components from '../components'
import rotateCoordinateAboutPoint from './rotateCoordinateAboutPoint'
import state from '../../state'
import { QUARTER_OF_CIRCLE_ROTATION } from '../constants'

export default ({ tileOrigin, tileSize, outlineOptions }) => {
	const { stripeStart, stripeEnd } = outlineOptions
	let outline = []
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]
	const tileArgs = { x, y, tileSize }

	const stripeStartsInTopLeftCorner = stripeStart === 0
	const stripeStartsInTopLeftHalf = stripeStart < 1
	const stripeEndsInBottomRightHalf = stripeEnd > 1
	const stripeEndsInBottomRightCorner = stripeEnd === 2

	if (stripeStartsInTopLeftHalf) {
		outline.push(pointAlongTopEdge(tileArgs, { stripePosition: stripeStart }))
	}
	else {
		outline.push(pointAlongRightEdge(tileArgs, { stripePosition: stripeStart }))
	}

	if (!stripeEndsInBottomRightHalf) {
		outline.push(pointAlongTopEdge(tileArgs, { stripePosition: stripeEnd }))
		outline.push(pointAlongLeftEdge(tileArgs, { stripePosition: stripeEnd }))
	}
	else {
		if (stripeStartsInTopLeftHalf) {
			outline.push(pointInTopRightCorner(tileArgs))
		}

		if (stripeEndsInBottomRightCorner) {
			outline.push(pointInBottomRightCorner(tileArgs))
		}
		else {
			outline.push(pointAlongRightEdge(tileArgs, { stripePosition: stripeEnd }))
			outline.push(pointAlongBottomEdge(tileArgs, { stripePosition: stripeEnd }))
		}
	}

	if (!stripeStartsInTopLeftCorner) {
		if (stripeStartsInTopLeftHalf) {
			if (stripeEndsInBottomRightHalf) {
				outline.push(pointInBottomLeftCorner(tileArgs))
			}
			outline.push(pointAlongLeftEdge(tileArgs, { stripePosition: stripeStart }))
		}
		else {
			outline.push(pointAlongBottomEdge(tileArgs, { stripePosition: stripeStart }))
		}
	}
	else {
		if (stripeEndsInBottomRightHalf) {
			outline.push(pointInBottomLeftCorner(tileArgs))
		}
	}

	if (state.mainHoundstooth.basePattern.stripeSettings && state.mainHoundstooth.basePattern.stripeSettings.baseStripeDiagonal === 'PRINCIPAL') {
		outline = outline.map(coordinate => rotateCoordinateAboutPoint({
			point: components.tileCenter({ tileOrigin, tileSize }),
			coordinate,
			rotation: QUARTER_OF_CIRCLE_ROTATION,
		}))
	}

	return outline
}

const pointAlongTopEdge = ({ x, y, tileSize }, { stripePosition }) => ([
	x + stripePosition * tileSize,
	y,
])

const pointAlongLeftEdge = ({ x, y, tileSize }, { stripePosition }) => ([
	x,
	y + stripePosition * tileSize,
])

const pointAlongRightEdge = ({ x, y, tileSize }, { stripePosition }) => ([
	x + tileSize,
	y + (stripePosition - 1) * tileSize,
])

const pointAlongBottomEdge = ({ x, y, tileSize }, { stripePosition }) => ([
	x + (stripePosition - 1) * tileSize,
	y + tileSize,
])

const pointInTopRightCorner = ({ x, y, tileSize }) => ([
	x + tileSize,
	y,
])

const pointInBottomRightCorner = ({ x, y, tileSize }) => ([
	x + tileSize,
	y + tileSize,
])

const pointInBottomLeftCorner = ({ x, y, tileSize }) => ([
	x,
	y + tileSize,
])
