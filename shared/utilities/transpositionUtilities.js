import state from '../state/state'

const scalePoint = ({ point, scaleFromGridCenter }) => {
	const { unit, canvasSize } = state.shared
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

const calculateOrigin = ({ initialOrigin, scaleFromGridCenter }) => {
	const { tileSize, offsetOrigin } = state.shared

	let origin = [ initialOrigin[ 0 ] * tileSize, initialOrigin[ 1 ] * tileSize ]
	origin = scalePoint({ point: origin, scaleFromGridCenter })

	if (offsetOrigin) {
		origin[ 0 ] += offsetOrigin[ 0 ]
		origin[ 1 ] += offsetOrigin[ 1 ]
	}

	return origin
}

// const pointIsOnCanvas = point => {
// 	const canvasSize = state.shared.canvasSize
// 	return point[0] >= 0 && point[0] < canvasSize && point[1] >= 0 && point[1] < canvasSize
// }

// const isOnCanvas ({ center, sizedUnit }) => {
// 	let vertices = calculateSquareCoordinates({ center, sizedUnit })
//
// 	const { canvasSize, gridRotationAboutCenter } = state.shared
// 	const canvasCenter = [ canvasSize / 2, canvasSize / 2]
//
// 	if (state.shared.gridRotationAboutCenter) {
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

export default {
	calculateOrigin
}