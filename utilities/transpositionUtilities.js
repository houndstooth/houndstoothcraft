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

const offsetShapeOrigin = ({ shapeOrigin }) => {
	return [
		shapeOrigin[ 0 ] += state.gridOriginOffset[ 0 ],
		shapeOrigin[ 1 ] += state.gridOriginOffset[ 1 ]
	]
}

const adjustOrigin = ({ shapeOrigin }) => {
	shapeOrigin = scaleShapeOrigin({ shapeOrigin })
	if (state.gridOriginOffset) shapeOrigin = offsetShapeOrigin({ shapeOrigin })
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
