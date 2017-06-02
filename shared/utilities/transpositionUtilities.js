import state from '../state/state'

const scalePoint = ({ point }) => {
	const { unit, canvasSize, scaleFromGridCenter } = state
	const canvasCenter = [ canvasSize / 2, canvasSize / 2 ]

	if (scaleFromGridCenter) {
		point[ 0 ] -= canvasCenter[ 0 ]
		point[ 1 ] -= canvasCenter[ 1 ]
	}

	point[ 0 ] *= unit
	point[ 1 ] *= unit

	if (scaleFromGridCenter) {
		point[ 0 ] += canvasCenter[ 0 ]
		point[ 1 ] += canvasCenter[ 1 ]
	}

	return point
}

const calculateOrigin = ({ address }) => {
	const { tileSize, offsetOrigin } = state

	let origin = [ address[ 0 ] * tileSize, address[ 1 ] * tileSize ]
	origin = scalePoint({ point: origin })

	if (offsetOrigin) {
		origin[ 0 ] += offsetOrigin[ 0 ]
		origin[ 1 ] += offsetOrigin[ 1 ]
	}

	return origin
}

// const pointIsOnCanvas = point => {
// 	const canvasSize = state.canvasSize
// 	return point[0] >= 0 && point[0] < canvasSize && point[1] >= 0 && point[1] < canvasSize
// }

// const isOnCanvas ({ center, sizedUnit }) => {
// 	let vertices = calculateSquareCoordinates({ center, sizedUnit })
//
// 	const { canvasSize, gridRotationAboutCenter } = state
// 	const canvasCenter = [ canvasSize / 2, canvasSize / 2]
//
// 	if (state.gridRotationAboutCenter) {
// 		vertices = rotateCoordinatesAboutPoint({
// 			point: canvasCenter,
// 			coordinates: vertices,
// 			rotation: gridRotationAboutCenter
// 		})
// 	}
//
// 	return vertices.some(pointIsOnCanvas)
//
// 	// it's way more complex than this, though...
// 	// need to handle the cases when:
// 	// 1. all vertices are off, but an edge is still on
// 	// 2. this one tile takes up the entire canvas (but all its edges and vertices are off)
// }

const calculateSizedUnit = ({ size }) => (size || state.tileSize) * state.unit

const calculateOriginAndSizedUnit = ({ address, size }) => {
	const sizedUnit = calculateSizedUnit({ size })
	const origin = calculateOrigin({ address, sizedUnit })
	return { origin, sizedUnit}
}

export default {
	calculateSizedUnit,
	calculateOriginAndSizedUnit
}