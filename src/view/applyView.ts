import applyZoom from './applyZoom'
import applyScroll from './applyScroll'
import applyTilt from './applyTilt'
import { Outline } from '../space'

const applyView: {(outline: Outline): Outline }  = outline => {
	outline = applyZoom(outline)
	outline = applyScroll(outline)
	outline = applyTilt(outline)
	return outline
}

export default applyView
