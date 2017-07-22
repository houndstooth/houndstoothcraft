import rotationUtilities from './rotationUtilities'
import store from '../../store'

const rotateShapeAboutCanvasCenter = ({ coordinates }) => {
	const { canvasSize, rotateViewAboutCanvasCenter } = store.currentState.builtPattern.base.viewSettings || {}

	if (rotateViewAboutCanvasCenter) {
		coordinates = rotationUtilities.rotateCoordinatesAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			coordinates: coordinates,
			rotation: rotateViewAboutCanvasCenter,
		})
	}

	return coordinates
}

const adjustTileOriginForZoom = ({ tileOrigin }) => {
	let zoomedAndScrolledTileOrigin = tileOrigin.slice()
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtZeroZeroAddress } = store.currentState.builtPattern.base.viewSettings || {}
	const canvasCenter = canvasSize / 2

	if (zoomOnCanvasCenter && !centerViewOnCenterOfTileAtZeroZeroAddress) {
		zoomedAndScrolledTileOrigin[ 0 ] -= canvasCenter
		zoomedAndScrolledTileOrigin[ 1 ] -= canvasCenter
	}

	zoomedAndScrolledTileOrigin[ 0 ] *= zoom
	zoomedAndScrolledTileOrigin[ 1 ] *= zoom

	if (zoomOnCanvasCenter && !centerViewOnCenterOfTileAtZeroZeroAddress) {
		zoomedAndScrolledTileOrigin[ 0 ] += canvasCenter
		zoomedAndScrolledTileOrigin[ 1 ] += canvasCenter
	}

	return zoomedAndScrolledTileOrigin
}

const centerViewOnCenterOfTileAtZeroZeroAddress = ({ zoomedAndScrolledTileOrigin }) => {
	const canvasSize = store.currentState.builtPattern.base.viewSettings.canvasSize
	const canvasCenter = canvasSize / 2

	const tileSize = store.currentState.builtPattern.base.tileSettings.tileSize
	const halfTileSize = tileSize / 2

	return [
		zoomedAndScrolledTileOrigin[ 0 ] + canvasCenter - halfTileSize,
		zoomedAndScrolledTileOrigin[ 1 ] + canvasCenter - halfTileSize,
	]
}

const applyZoomAndScroll = ({ tileOrigin, tileSize }) => {
	let zoomedAndScrolledTileOrigin = adjustTileOriginForZoom({ tileOrigin })
	if (store.currentState.builtPattern.base.viewSettings && store.currentState.builtPattern.base.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress) {
		zoomedAndScrolledTileOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ zoomedAndScrolledTileOrigin })
	}
	const zoomedTileSize = tileSize * store.currentState.builtPattern.base.viewSettings.zoom

	return { zoomedAndScrolledTileOrigin, zoomedTileSize }
}

export default {
	rotateShapeAboutCanvasCenter,
	applyZoomAndScroll,
}
