import { Path, Pixel } from '../../app'
import { CANVAS_SIZE } from '../../constants'
import { from, to } from '../../utilities'
import { HALF } from '../constants'
import { patternState } from '../patternState'

const applyScroll: (_: Path) => Path =
	(path: Path): Path => {
		if (!patternState.viewSettings.centerViewOnCenterOfTileAtHomeAddress) {
			return path
		}

		return to.Path(path.map(applyCenterViewOnCenterOfTileAtHomeAddress))
	}

const applyCenterViewOnCenterOfTileAtHomeAddress: (pixel: Pixel) => Pixel =
	(pixel: Pixel): Pixel => {
		const canvasCenter: number = from.Px(CANVAS_SIZE) * HALF

		const halfTileSize: number = from.Unit(patternState.tileSettings.tileSize) * HALF

		return to.Pixel([
			from.Px(pixel[ 0 ]) + canvasCenter - halfTileSize,
			from.Px(pixel[ 1 ]) + canvasCenter - halfTileSize,
		])
	}

export default applyScroll
