import applyZoom from './applyZoom'
import applyScroll from './applyScroll'
import applyTilt from './applyTilt'
import { Outline } from '../space'

const applyView: {(outline: Outline): Outline }  = outline => {
	let outlineWithViewApplied = outline

	outlineWithViewApplied = applyZoom(outlineWithViewApplied)
	outlineWithViewApplied = applyScroll(outlineWithViewApplied)
	outlineWithViewApplied = applyTilt(outlineWithViewApplied)

	return outlineWithViewApplied
}

export default applyView
