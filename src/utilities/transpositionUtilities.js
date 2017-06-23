import state from '../state/state'

const adjustTileOriginForZoom = ({ tileOrigin }) => {
	const { zoom, canvasSize, zoomOnCanvasCenter } = state.viewConfig
	const canvasCenter = [ canvasSize / 2, canvasSize / 2 ]

	if (zoomOnCanvasCenter) {
		tileOrigin[ 0 ] -= canvasCenter[ 0 ]
		tileOrigin[ 1 ] -= canvasCenter[ 1 ]
	}

	tileOrigin[ 0 ] *= zoom
	tileOrigin[ 1 ] *= zoom

	if (zoomOnCanvasCenter) {
		tileOrigin[ 0 ] += canvasCenter[ 0 ]
		tileOrigin[ 1 ] += canvasCenter[ 1 ]
	}

	return tileOrigin
}

const centerViewOnCenterOfTileAtZeroZeroAddress = ({ tileOrigin }) => {
	const canvasCenter = state.viewConfig.canvasSize / 2
	const halfTileSize = state.tileConfig.tileSize / 2
	return [
		tileOrigin[ 0 ] + canvasCenter - halfTileSize,
		tileOrigin[ 1 ] + canvasCenter - halfTileSize
	]
}

const adjustOrigin = ({ tileOrigin }) => {
	tileOrigin = adjustTileOriginForZoom({ tileOrigin })
	if (state.viewConfig.centerViewOnCenterOfTileAtZeroZeroAddress) tileOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ tileOrigin })
	return tileOrigin
}

const getSizedUnit = () => state.tileConfig.tileSize * state.viewConfig.zoom

const getStandardTileOriginAndSizedUnit = ({ address }) => ({
	sizedUnit: getSizedUnit(),
	tileOrigin: adjustOrigin({
		tileOrigin: [ address[ 0 ] * state.tileConfig.tileSize, address[ 1 ] * state.tileConfig.tileSize ]
	})
})

const getTileOriginAndSizedUnit = ({ address }) => {
	const getTileOriginAndSizedUnit = state.getTileOriginAndSizedUnit || getStandardTileOriginAndSizedUnit
	return getTileOriginAndSizedUnit({ address })
}

export default {
	adjustOrigin,
	getSizedUnit,
	getTileOriginAndSizedUnit
}
