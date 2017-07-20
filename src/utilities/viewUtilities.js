import rotationUtilities from './rotationUtilities'

const rotateShapeAboutCanvasCenter = ({ coordinates }) => {
	const { canvasSize, rotateViewAboutCanvasCenter } = currentState.settings.base.viewSettings || {}

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
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtZeroZeroAddress } = currentState.settings.base.viewSettings || {}
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
	const canvasSize = currentState.settings.base.viewSettings.canvasSize
	const canvasCenter = canvasSize / 2

	const tileSize = currentState.settings.base.tileSettings.tileSize
	const halfTileSize = tileSize / 2

	return [
		zoomedAndScrolledTileOrigin[ 0 ] + canvasCenter - halfTileSize,
		zoomedAndScrolledTileOrigin[ 1 ] + canvasCenter - halfTileSize,
	]
}

const applyZoomAndScroll = ({ tileOrigin, tileSize }) => {
	let zoomedAndScrolledTileOrigin = adjustTileOriginForZoom({ tileOrigin })
	if (currentState.settings.base.viewSettings && currentState.settings.base.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress) {
		zoomedAndScrolledTileOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ zoomedAndScrolledTileOrigin })
	}
	const zoomedTileSize = tileSize * currentState.settings.base.viewSettings.zoom

	return { zoomedAndScrolledTileOrigin, zoomedTileSize }
}

export default {
	rotateShapeAboutCanvasCenter,
	applyZoomAndScroll,
}
