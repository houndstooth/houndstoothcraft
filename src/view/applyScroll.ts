import { Unit } from '../components'
import { HALF } from '../constants'
import { Dimension } from '../page'
import { Path, Pixel } from '../render'
import { getFromBaseOrDefaultPattern } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'

const applyScroll: (path: Path) => Path = path => {
	// tslint:disable-next-line:max-line-length
	const centerViewOnCenterOfTileAtHomeAddress: boolean = getFromBaseOrDefaultPattern('centerViewOnCenterOfTileAtHomeAddress')

	if (!centerViewOnCenterOfTileAtHomeAddress) {
		return path
	}

	return path.map(applyCenterViewOnCenterOfTileAtHomeAddress)
}

const applyCenterViewOnCenterOfTileAtHomeAddress: (coordinate: Pixel) => Pixel = coordinate => {
	const canvasSize: Dimension = getFromBaseOrDefaultPattern('canvasSize')
	const canvasCenter = from.Dimension(canvasSize) * HALF

	const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')
	const halfTileSize = from.Unit(tileSize) * HALF

	return to.Pixel([
		from.Dimension(coordinate[ 0 ]) + canvasCenter - halfTileSize,
		from.Dimension(coordinate[ 1 ]) + canvasCenter - halfTileSize,
	])
}

export { applyScroll }
