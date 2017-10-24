import { Unit } from '../components'
import { HALF } from '../constants'
import { Px } from '../page'
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

const applyCenterViewOnCenterOfTileAtHomeAddress: (pixel: Pixel) => Pixel = pixel => {
	const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
	const canvasCenter = from.Px(canvasSize) * HALF

	const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')
	const halfTileSize = from.Unit(tileSize) * HALF

	return to.Pixel([
		from.Px(pixel[ 0 ]) + canvasCenter - halfTileSize,
		from.Px(pixel[ 1 ]) + canvasCenter - halfTileSize,
	])
}

export { applyScroll }
