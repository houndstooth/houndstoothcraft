import { Path, Pixel } from '../../app'
import { from, mathUtilities, to } from '../../utilities'
import { patternState } from '../patternState'
import { Radian } from '../stripe'

const applyTilt: (_: Path) => Path =
	(path: Path): Path => {
		if (patternState.viewSettings.tilt === to.Radian(0)) {
			return path
		}

		return to.Path(path.map((pixel: Pixel): Pixel => tilt({
			fixedPoint: to.Pixel([ 0, 0 ]),
			point: pixel,
			rotation: patternState.viewSettings.tilt,
		})))
	}

const tilt: (_: { fixedPoint: Pixel, point: Pixel, rotation: Radian }) => Pixel =
	({ fixedPoint, point, rotation }: { fixedPoint: Pixel, point: Pixel, rotation: Radian }): Pixel =>
		to.Pixel(mathUtilities.rotate({ fixedPoint: from.Pixel(fixedPoint), point: from.Pixel(point), rotation }))

export default applyTilt
