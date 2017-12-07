import { Path } from '../../app'
import { from, to } from '../../utilities'
import { Outline } from '../stripe'
import applyScroll from './applyScroll'
import applyTilt from './applyTilt'
import applyZoom from './applyZoom'

const applyViewForShape: (_: Outline) => Path =
	(outline: Outline): Path => {
		let path: Path = to.Path(from.Outline(outline))

		path = applyZoom(path)
		path = applyScroll(path)
		path = applyTilt(path)

		return path
	}

export default applyViewForShape
