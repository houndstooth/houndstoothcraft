import { getFromBaseOrDefaultPattern, Path, Pixel, Px } from '../../app'
import { HALF } from '../../constants'
import * as from from '../../from'
import * as to from '../../to'
import { Unit } from '../grid'

const applyScroll: (path: Path) => Path =
	(path: Path): Path => {
		// tslint:disable-next-line:max-line-length
		const centerViewOnCenterOfTileAtHomeAddress: boolean = getFromBaseOrDefaultPattern.main('centerViewOnCenterOfTileAtHomeAddress')

		if (!centerViewOnCenterOfTileAtHomeAddress) {
			return path
		}

		return to.Path(path.map(applyCenterViewOnCenterOfTileAtHomeAddress))
	}

const applyCenterViewOnCenterOfTileAtHomeAddress: (pixel: Pixel) => Pixel =
	(pixel: Pixel): Pixel => {
		const canvasSize: Px = getFromBaseOrDefaultPattern.main('canvasSize')
		const canvasCenter: number = from.Px(canvasSize) * HALF

		const tileSize: Unit = getFromBaseOrDefaultPattern.main('tileSize')
		const halfTileSize: number = from.Unit(tileSize) * HALF

		return to.Pixel([
			from.Px(pixel[ 0 ]) + canvasCenter - halfTileSize,
			from.Px(pixel[ 1 ]) + canvasCenter - halfTileSize,
		])
	}

export { applyScroll as main }
