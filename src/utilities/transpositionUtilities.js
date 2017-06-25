import state from '../state/state'
import { TILE_SIZE, ZOOM } from '../defaults'

const adjustTileOriginForZoom = ({ tileOrigin }) => {
	let { zoom, canvasSize, zoomOnCanvasCenter } = state.viewConfig || {}
	zoom = zoom || ZOOM
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
	if (state.viewConfig && state.viewConfig.centerViewOnCenterOfTileAtZeroZeroAddress) {
		tileOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ tileOrigin })
	} 
	return tileOrigin
}

const getTileSize = () => state.tileConfig && state.tileConfig.tileSize || TILE_SIZE

const getSizedUnit = () => {
	const tileSize = getTileSize()
	const zoom = state.viewConfig && state.viewConfig.zoom || ZOOM
	return tileSize * zoom
}

const getStandardTileOriginAndSizedUnit = ({ address }) => {
	const tileSize = getTileSize()
	return {
		sizedUnit: getSizedUnit(),
		tileOrigin: adjustOrigin({
			tileOrigin: [ address[ 0 ] * tileSize, address[ 1 ] * tileSize ]
		})
	}
}

const getTileOriginAndSizedUnit = ({ address }) => {
	const getTileOriginAndSizedUnit = state.getTileOriginAndSizedUnit || getStandardTileOriginAndSizedUnit
	return getTileOriginAndSizedUnit({ address })
}

export default {
	adjustOrigin,
	getSizedUnit,
	getTileOriginAndSizedUnit
}
