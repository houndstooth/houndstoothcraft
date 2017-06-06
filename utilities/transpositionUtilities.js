import state from '../state/state'

const scaleShapeOrigin = ({ shapeOrigin }) => {
	const { unit, canvasSize, scaleFromCanvasCenter } = state
	const canvasCenter = [ canvasSize / 2, canvasSize / 2 ]

	if (scaleFromCanvasCenter) {
		shapeOrigin[ 0 ] -= canvasCenter[ 0 ]
		shapeOrigin[ 1 ] -= canvasCenter[ 1 ]
	}

	shapeOrigin[ 0 ] *= unit
	shapeOrigin[ 1 ] *= unit

	if (scaleFromCanvasCenter) {
		shapeOrigin[ 0 ] += canvasCenter[ 0 ]
		shapeOrigin[ 1 ] += canvasCenter[ 1 ]
	}

	return shapeOrigin
}

const centerViewOnCenterOfTileAtZeroZeroAddress = ({ shapeOrigin }) => {
	const canvasCenter = state.canvasSize / 2
	const halfTileSize = state.tileSize / 2
	return [
		shapeOrigin[ 0 ] + canvasCenter - halfTileSize,
		shapeOrigin[ 1 ] + canvasCenter - halfTileSize
	]
}

const adjustOrigin = ({ shapeOrigin }) => {
	shapeOrigin = scaleShapeOrigin({ shapeOrigin })
	if (state.centerViewOnCenterOfTileAtZeroZeroAddress) shapeOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ shapeOrigin })
	return shapeOrigin
}

const getSizedUnit = () => state.tileSize * state.unit

const getStandardShapeOriginAndSizedUnit = ({ address }) => ({
	sizedUnit: getSizedUnit(),
	shapeOrigin: adjustOrigin({
		shapeOrigin: [ address[ 0 ] * state.tileSize, address[ 1 ] * state.tileSize ]
	})
})

const getShapeOriginAndSizedUnit = ({ address }) => {
	const getShapeOriginAndSizedUnit = state.getShapeOriginAndSizedUnit || getStandardShapeOriginAndSizedUnit
	return getShapeOriginAndSizedUnit({ address })
}

export default {
	adjustOrigin,
	getSizedUnit,
	getShapeOriginAndSizedUnit
}
