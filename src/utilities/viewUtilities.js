import rotationUtilities from './rotationUtilities'

const rotateShapeAboutCanvasCenter = ({ coordinates }) => {
	const { canvasSize, rotateViewAboutCanvasCenter } = current.settings.initial.viewSettings || {}

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
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtZeroZeroAddress } = current.settings.initial.viewSettings || {}
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
	const canvasSize = current.settings.initial.viewSettings.canvasSize
	const canvasCenter = canvasSize / 2

	const tileSize = current.settings.initial.tileSettings.tileSize
	const halfTileSize = tileSize / 2

	return [
		zoomedAndScrolledTileOrigin[ 0 ] + canvasCenter - halfTileSize,
		zoomedAndScrolledTileOrigin[ 1 ] + canvasCenter - halfTileSize,
	]
}

const applyZoomAndScroll = ({ tileOrigin, tileSize }) => {
	let zoomedAndScrolledTileOrigin = adjustTileOriginForZoom({ tileOrigin })
	if (current.settings.initial.viewSettings && current.settings.initial.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress) {
		zoomedAndScrolledTileOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ zoomedAndScrolledTileOrigin })
	}
	const zoomedTileSize = tileSize * current.settings.initial.viewSettings.zoom

	return { zoomedAndScrolledTileOrigin, zoomedTileSize }
}

export default {
	rotateShapeAboutCanvasCenter,
	applyZoomAndScroll,
}
