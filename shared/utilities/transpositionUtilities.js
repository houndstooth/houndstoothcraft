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

const calculateOriginAndCenter = ({ initialOrigin: origin, initialCenter: center, scaleFromGridCenter, sizedUnit }) => {
	const { tileSize, offsetOrigin } = state.shared

	if (center) {
		center = scalePoint({ point: center, scaleFromGridCenter })
		origin = [
			center[ 0 ] - sizedUnit / 2,
			center[ 1 ] - sizedUnit / 2
		]
	} else if (origin) {
		origin = [ origin[ 0 ] * tileSize, origin[ 1 ] * tileSize ]
		origin = scalePoint({ point: origin, scaleFromGridCenter })
		center = [
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit / 2
		]
	} else {
		console.log('neither origin nor center provided!')
	}

	if (offsetOrigin) {
		origin[ 0 ] += offsetOrigin[ 0 ]
		origin[ 1 ] += offsetOrigin[ 1 ]
		center[ 0 ] += offsetOrigin[ 0 ]
		center[ 1 ] += offsetOrigin[ 1 ]
	}

	return { origin, center }
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
	calculateOriginAndCenter,
	//isOnCanvas
}