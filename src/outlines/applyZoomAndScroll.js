import store from '../../store'

export default outline => {
	const newOutline = []

	outline.forEach(coordinate => {
		let newCoordinate = adjustTileOriginForZoom({ tileOrigin: coordinate })
		if (store.mainHoundstooth.basePattern.viewSettings && store.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress) {
			newCoordinate = centerViewOnCenterOfTileAtZeroZeroAddress({ tileOrigin: newCoordinate })
		}
		newOutline.push(newCoordinate)
	})

	return newOutline
}

const adjustTileOriginForZoom = ({ tileOrigin }) => {
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtZeroZeroAddress } = store.mainHoundstooth.basePattern.viewSettings || {}
	const canvasCenter = canvasSize / 2

	if (zoomOnCanvasCenter && !centerViewOnCenterOfTileAtZeroZeroAddress) {
		tileOrigin[ 0 ] -= canvasCenter
		tileOrigin[ 1 ] -= canvasCenter
	}

	tileOrigin[ 0 ] *= zoom
	tileOrigin[ 1 ] *= zoom

	if (zoomOnCanvasCenter && !centerViewOnCenterOfTileAtZeroZeroAddress) {
		tileOrigin[ 0 ] += canvasCenter
		tileOrigin[ 1 ] += canvasCenter
	}

	return tileOrigin
}

const centerViewOnCenterOfTileAtZeroZeroAddress = ({ tileOrigin }) => {
	const canvasSize = store.mainHoundstooth.basePattern.viewSettings.canvasSize
	const canvasCenter = canvasSize / 2

	const tileSizeSetting = store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	const halfTileSize = tileSizeSetting / 2

	return [
		tileOrigin[ 0 ] + canvasCenter - halfTileSize,
		tileOrigin[ 1 ] + canvasCenter - halfTileSize,
	]
}
