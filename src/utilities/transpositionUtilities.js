import { CANVAS_SIZE, TILE_SIZE, ZOOM } from '../defaults'
import codeUtilities from './codeUtilities'

const adjustTileOriginForZoom = ({ tileOrigin }) => {
	let { zoom, canvasSize, zoomOnCanvasCenter, centerViewOnCenterOfTileAtZeroZeroAddress } = current.settings.initial.viewSettings || {}
	zoom = zoom || ZOOM
	canvasSize = canvasSize || CANVAS_SIZE
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
	let canvasSize
	if (current.settings.initial.viewSettings && codeUtilities.isDefined(current.settings.initial.viewSettings.canvasSize)) {
		canvasSize = current.settings.initial.viewSettings.canvasSize
	}
	else {
		canvasSize = CANVAS_SIZE
	}
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
	let tileSize
	if (current.settings.initial.tileSettings && codeUtilities.isDefined(current.settings.initial.tileSettings.tileSize)) {
		tileSize = current.settings.initial.tileSettings.tileSize
	}
	else {
		tileSize = TILE_SIZE
	}
	return tileSize
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
