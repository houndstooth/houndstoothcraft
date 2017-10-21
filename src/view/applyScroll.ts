import { HALF } from '../constants'
import * as from from '../from'
import { Coordinate, Outline } from '../space'
import { state } from '../state'
import * as to from '../to'

const applyScroll: (outline: Outline) => Outline = outline => {
	const { centerViewOnCenterOfTileAtHomeAddress } = state.mainHoundstooth.basePattern.viewSettings

	if (!centerViewOnCenterOfTileAtHomeAddress) {
		return outline
	}

	return outline.map(applyCenterViewOnCenterOfTileAtHomeAddress)
}

const applyCenterViewOnCenterOfTileAtHomeAddress: (coordinate: Coordinate) => Coordinate = coordinate => {
	const { canvasSize } = state.mainHoundstooth.basePattern.viewSettings
	const canvasCenter = canvasSize * HALF

	const { tileSizeSetting } = state.mainHoundstooth.basePattern.tileSettings
	const halfTileSize = tileSizeSetting * HALF

	return to.Coordinate([
		from.Units(coordinate[ 0 ]) + canvasCenter - halfTileSize,
		from.Units(coordinate[ 1 ]) + canvasCenter - halfTileSize,
	])
}

export { applyScroll }
