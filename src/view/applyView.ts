import { Outline } from '../space'
import applyScroll from './applyScroll'
import applyTilt from './applyTilt'
import applyZoom from './applyZoom'

const applyView: {(outline: Outline): Outline }  = outline => {
	let outlineWithViewApplied = outline

	outlineWithViewApplied = applyZoom(outlineWithViewApplied)
	outlineWithViewApplied = applyScroll(outlineWithViewApplied)
	outlineWithViewApplied = applyTilt(outlineWithViewApplied)

	return outlineWithViewApplied
}

export default applyView
