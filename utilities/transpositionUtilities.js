import state from '../state/state'

const adjustShapeOriginForZoom = ({ shapeOrigin }) => {
	const { zoom, canvasSize, zoomOnCanvasCenter } = state.viewConfig
	const canvasCenter = [ canvasSize / 2, canvasSize / 2 ]

	if (zoomOnCanvasCenter) {
		shapeOrigin[ 0 ] -= canvasCenter[ 0 ]
		shapeOrigin[ 1 ] -= canvasCenter[ 1 ]
	}

	shapeOrigin[ 0 ] *= zoom
	shapeOrigin[ 1 ] *= zoom

	if (zoomOnCanvasCenter) {
		shapeOrigin[ 0 ] += canvasCenter[ 0 ]
		shapeOrigin[ 1 ] += canvasCenter[ 1 ]
	}

	return shapeOrigin
}

const centerViewOnCenterOfTileAtZeroZeroAddress = ({ shapeOrigin }) => {
	const canvasCenter = state.viewConfig.canvasSize / 2
	const halfTileSize = state.tileConfig.tileSize / 2
	return [
		shapeOrigin[ 0 ] + canvasCenter - halfTileSize,
		shapeOrigin[ 1 ] + canvasCenter - halfTileSize
	]
}

const adjustOrigin = ({ shapeOrigin }) => {
	shapeOrigin = adjustShapeOriginForZoom({ shapeOrigin })
	if (state.viewConfig.centerViewOnCenterOfTileAtZeroZeroAddress) shapeOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ shapeOrigin })
	return shapeOrigin
}

const getSizedUnit = () => state.tileConfig.tileSize * state.viewConfig.zoom

const getStandardShapeOriginAndSizedUnit = ({ address }) => ({
	sizedUnit: getSizedUnit(),
	shapeOrigin: adjustOrigin({
		shapeOrigin: [ address[ 0 ] * state.tileConfig.tileSize, address[ 1 ] * state.tileConfig.tileSize ]
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
