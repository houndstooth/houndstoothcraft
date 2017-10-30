import { Path } from '../render'
import { Outline } from '../space'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { applyScroll } from './applyScroll'
import { applyTilt } from './applyTilt'
import { applyZoom } from './applyZoom'

const applyView: (outline: Outline) => Path =
	(outline: Outline): Path => {
		let path: Path = to.Path(from.Outline(outline))

		path = applyZoom(path)
		path = applyScroll(path)
		path = applyTilt(path)

		return path
	}

export { applyView }
