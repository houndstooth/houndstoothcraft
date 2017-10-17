import { Coordinate, Outline } from '../space'
import state from '../state'

const applyScroll: (outline: Outline) => Outline = outline => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const viewSettings = basePattern.viewSettings || {}
	const centerViewOnCenterOfTileAtHomeAddress = viewSettings.centerViewOnCenterOfTileAtHomeAddress

	if (!centerViewOnCenterOfTileAtHomeAddress) {
		return outline
	}

	return outline.map(applyCenterViewOnCenterOfTileAtHomeAddress)
}

const applyCenterViewOnCenterOfTileAtHomeAddress: (coordinate: Coordinate) => Coordinate = coordinate => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const viewSettings = basePattern.viewSettings || {}
	const canvasSize = viewSettings.canvasSize
	const canvasCenter = canvasSize as number / 2 as any

	const tileSettings = basePattern.tileSettings || {}
	const tileSizeSetting = tileSettings.tileSizeSetting
	const halfTileSize = tileSizeSetting as any / 2 as any

	return [
		coordinate[ 0 ] as any + canvasCenter - halfTileSize as any,
		coordinate[ 1 ] as any + canvasCenter - halfTileSize as any,
	] as Coordinate
}

export default applyScroll
