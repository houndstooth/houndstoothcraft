import { Path, Pixel } from '../../app'
import { codeUtilities, from, to } from '../../utilities'
import { patternState } from '../patternState'

const applyScroll: (_: Path) => Path =
	(path: Path): Path => {
		if (codeUtilities.deepEqual(patternState.viewSettings.scroll, [ to.Px(0), to.Px(0) ])) {
			return path
		}

		return to.Path(path.map(scroll))
	}

const scroll: (pixel: Pixel) => Pixel =
	(pixel: Pixel): Pixel =>
		to.Pixel([
			from.Px(pixel[ 0 ]) + from.Px(patternState.viewSettings.scroll[ 0 ]),
			from.Px(pixel[ 1 ]) + from.Px(patternState.viewSettings.scroll[ 1 ]),
		])

export default applyScroll
