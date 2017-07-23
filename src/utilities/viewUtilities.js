import rotationUtilities from './rotationUtilities'
import store from '../../store'

const rotateShapeAboutCanvasCenter = ({ coordinates }) => {
	const { canvasSize, rotateViewAboutCanvasCenter } = store.currentState.mainHoundstooth.basePattern.viewSettings || {}

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
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtZeroZeroAddress } = store.currentState.mainHoundstooth.basePattern.viewSettings || {}
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
	const canvasSize = store.currentState.mainHoundstooth.basePattern.viewSettings.canvasSize
	const canvasCenter = canvasSize / 2

	const tileSize = store.currentState.mainHoundstooth.basePattern.tileSettings.tileSize
	const halfTileSize = tileSize / 2

	return [
		zoomedAndScrolledTileOrigin[ 0 ] + canvasCenter - halfTileSize,
		zoomedAndScrolledTileOrigin[ 1 ] + canvasCenter - halfTileSize,
	]
}

const applyZoomAndScroll = ({ tileOrigin, tileSize }) => {
	let zoomedAndScrolledTileOrigin = adjustTileOriginForZoom({ tileOrigin })
	if (store.currentState.mainHoundstooth.basePattern.viewSettings && store.currentState.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress) {
		zoomedAndScrolledTileOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ zoomedAndScrolledTileOrigin })
	}
	const zoomedTileSize = tileSize * store.currentState.mainHoundstooth.basePattern.viewSettings.zoom

	return { zoomedAndScrolledTileOrigin, zoomedTileSize }
}

export default {
	rotateShapeAboutCanvasCenter,
	applyZoomAndScroll,
}
