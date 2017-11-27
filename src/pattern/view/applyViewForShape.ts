import { Path } from '../../app'
import * as from from '../../from'
import * as to from '../../to'
import { Outline } from '../stripe'
import applyScroll from './applyScroll'
import applyTilt from './applyTilt'
import applyZoom from './applyZoom'

const applyViewForShape: (outline: Outline) => Path =
	(outline: Outline): Path => {
		let path: Path = to.Path(from.Outline(outline))

		path = applyZoom(path)
		path = applyScroll(path)
		path = applyTilt(path)

		return path
	}

export default applyViewForShape
