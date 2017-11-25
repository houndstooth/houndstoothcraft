import { Path } from '../../app'
import * as from from '../../from'
import * as to from '../../to'
import { Outline } from '../stripe'
import { main as applyScroll } from './applyScroll'
import { main as applyTilt } from './applyTilt'
import { main as applyZoom } from './applyZoom'

const applyViewForShape: (outline: Outline) => Path =
	(outline: Outline): Path => {
		let path: Path = to.Path(from.Outline(outline))

		path = applyZoom(path)
		path = applyScroll(path)
		path = applyTilt(path)

		return path
	}

export { applyViewForShape as main }
