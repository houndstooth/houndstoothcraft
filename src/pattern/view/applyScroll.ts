import { getSetting, Path, Pixel } from '../../app'
import { CANVAS_SIZE, HALF } from '../../constants'
import { from, to } from '../../utilities'
import { Unit } from '../grid'

const applyScroll: (path: Path) => Path =
	(path: Path): Path => {
		// tslint:disable-next-line:max-line-length
		const centerViewOnCenterOfTileAtHomeAddress: boolean = getSetting.default('centerViewOnCenterOfTileAtHomeAddress')

		if (!centerViewOnCenterOfTileAtHomeAddress) {
			return path
		}

		return to.Path(path.map(applyCenterViewOnCenterOfTileAtHomeAddress))
	}

const applyCenterViewOnCenterOfTileAtHomeAddress: (pixel: Pixel) => Pixel =
	(pixel: Pixel): Pixel => {
		const canvasCenter: number = from.Px(CANVAS_SIZE) * HALF

		const tileSize: Unit = getSetting.default('tileSize')
		const halfTileSize: number = from.Unit(tileSize) * HALF

		return to.Pixel([
			from.Px(pixel[ 0 ]) + canvasCenter - halfTileSize,
			from.Px(pixel[ 1 ]) + canvasCenter - halfTileSize,
		])
	}

export default applyScroll
