import { Path, Pixel, Px } from '../../app'
import { from, to } from '../../utilities'
import { patternState } from '../patternState'

const applyZoom: (_: Path) => Path =
	(path: Path): Path => {
		if (patternState.viewSettings.zoom === 1) {
			return path
		}

		return to.Path(path.map(adjustPixelForZoom))
	}

const adjustPixelForZoom: (_: Pixel) => Pixel =
	(pixel: Pixel): Pixel =>
		to.Pixel(pixel.map((px: Px): number =>
			from.Px(px) * patternState.viewSettings.zoom))

export default applyZoom
