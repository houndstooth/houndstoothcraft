import state from '../state'
import { Outline, Coordinate } from '../space'

const applyScroll: { (outline: Outline): Outline } = outline => {
	const viewSettings = state.mainHoundstooth.basePattern.viewSettings
	const centerViewOnCenterOfTileAtHomeAddress = viewSettings.centerViewOnCenterOfTileAtHomeAddress

	if (!centerViewOnCenterOfTileAtHomeAddress) {
		return outline
	}

	return outline.map(applyCenterViewOnCenterOfTileAtHomeAddress)
}

const applyCenterViewOnCenterOfTileAtHomeAddress: { (coordinate: Coordinate): Coordinate } = coordinate => {
	const canvasSize = state.mainHoundstooth.basePattern.viewSettings.canvasSize
	const canvasCenter = canvasSize as number / 2

	const tileSizeSetting = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	const halfTileSize = tileSizeSetting / 2

	return [
		coordinate[ 0 ] + canvasCenter - halfTileSize,
		coordinate[ 1 ] + canvasCenter - halfTileSize,
	] as Coordinate
}

export default applyScroll
