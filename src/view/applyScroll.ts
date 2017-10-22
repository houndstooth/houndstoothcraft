import { Unit } from '../components'
import { HALF } from '../constants'
import { Dimension } from '../page'
import { Coordinate, Outline } from '../space'
import { getFromBaseOrDefaultPattern, ViewSettings } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'

const applyScroll: (outline: Outline) => Outline = outline => {
	const { centerViewOnCenterOfTileAtHomeAddress }: ViewSettings = getFromBaseOrDefaultPattern('view')

	if (!centerViewOnCenterOfTileAtHomeAddress) {
		return outline
	}

	return outline.map(applyCenterViewOnCenterOfTileAtHomeAddress)
}

const applyCenterViewOnCenterOfTileAtHomeAddress: (coordinate: Coordinate) => Coordinate = coordinate => {
	const canvasSize: Dimension = getFromBaseOrDefaultPattern('canvasSize')
	const canvasCenter = from.Dimension(canvasSize) * HALF

	const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')
	const halfTileSize = from.Unit(tileSize) * HALF

	return to.Coordinate([
		from.Unit(coordinate[ 0 ]) + canvasCenter - halfTileSize,
		from.Unit(coordinate[ 1 ]) + canvasCenter - halfTileSize,
	])
}

export { applyScroll }
