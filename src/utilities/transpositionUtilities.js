import { CANVAS_SIZE, TILE_SIZE, ZOOM } from '../defaults'
import settingsUtilities from './settingsUtilities'

const adjustTileOriginForZoom = ({ tileOrigin }) => {
	let { zoom, zoomOnCanvasCenter, centerViewOnCenterOfTileAtZeroZeroAddress } = current.settings.initial.viewSettings || {}
	zoom = zoom || ZOOM
	const canvasSize = settingsUtilities.getFromSettingsOrDefault({
		nestedPropertyPath: [ 'initial', 'viewSettings', 'canvasSize' ],
		defaultForProperty: CANVAS_SIZE,
	})
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
	const canvasSize = settingsUtilities.getFromSettingsOrDefault({
		nestedPropertyPath: [ 'initial', 'viewSettings', 'canvasSize' ],
		defaultForProperty: CANVAS_SIZE,
	})
	const canvasCenter = canvasSize / 2

	const tileSize = getTileSize()
	const halfTileSize = tileSize / 2

	return [
		tileOrigin[ 0 ] + canvasCenter - halfTileSize,
		tileOrigin[ 1 ] + canvasCenter - halfTileSize,
	]
}

const adjustOrigin = ({ tileOrigin }) => {
	tileOrigin = adjustTileOriginForZoom({ tileOrigin })
	if (current.settings.initial.viewSettings && current.settings.initial.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress) {
		tileOrigin = centerViewOnCenterOfTileAtZeroZeroAddress({ tileOrigin })
	}
	return tileOrigin
}

const getTileSize = () => {
	return settingsUtilities.getFromSettingsOrDefault({
		nestedPropertyPath: [ 'initial', 'tileSettings', 'tileSize' ],
		defaultForProperty: TILE_SIZE,
	})
}

const getSizedUnit = () => {
	const tileSize = getTileSize()
	const zoom = current.settings.initial.viewSettings && current.settings.initial.viewSettings.zoom || ZOOM
	return tileSize * zoom
}

const getStandardTileOriginAndSizedUnit = ({ address }) => {
	const tileSize = getTileSize()
	return {
		sizedUnit: getSizedUnit(),
		tileOrigin: adjustOrigin({
			tileOrigin: [ address[ 0 ] * tileSize, address[ 1 ] * tileSize ],
		}),
	}
}

const getTileOriginAndSizedUnit = ({ address }) => {
	const getTileOriginAndSizedUnit = current.settings.initial.getTileOriginAndSizedUnit || getStandardTileOriginAndSizedUnit
	return getTileOriginAndSizedUnit({ address })
}

export default {
	adjustOrigin,
	getSizedUnit,
	getTileOriginAndSizedUnit,
}
