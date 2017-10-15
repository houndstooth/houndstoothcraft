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
	const canvasCenter = canvasSize as number / 2 as any

	const tileSizeSetting = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	const halfTileSize = tileSizeSetting as any / 2 as any

	return [
		coordinate[ 0 ] as any + canvasCenter - halfTileSize as any,
		coordinate[ 1 ] as any + canvasCenter - halfTileSize as any,
	] as Coordinate
}

export default applyScroll
