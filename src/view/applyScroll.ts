import { HALF } from '../constants'
import { Coordinate, Outline } from '../space'
import { state } from '../state'

const applyScroll: (outline: Outline) => Outline = outline => {
	const { centerViewOnCenterOfTileAtHomeAddress } = state.mainHoundstooth.basePattern.viewSettings

	if (!centerViewOnCenterOfTileAtHomeAddress) {
		return outline
	}

	return outline.map(applyCenterViewOnCenterOfTileAtHomeAddress)
}

const applyCenterViewOnCenterOfTileAtHomeAddress: (coordinate: Coordinate) => Coordinate = coordinate => {
	const { canvasSize } = state.mainHoundstooth.basePattern.viewSettings
	const canvasCenter = canvasSize as number * HALF as any

	const { tileSizeSetting } = state.mainHoundstooth.basePattern.tileSettings
	const halfTileSize = tileSizeSetting * HALF as any

	return [
		coordinate[ 0 ] as any + canvasCenter - halfTileSize as any,
		coordinate[ 1 ] as any + canvasCenter - halfTileSize as any,
	] as Coordinate
}

export { applyScroll }
