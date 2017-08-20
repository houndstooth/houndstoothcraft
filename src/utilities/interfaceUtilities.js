import store from '../../store'
import codeUtilities from './codeUtilities'

const insertElementRightAfter = (element, elementRightAfterWhichToInsert) => {
	elementRightAfterWhichToInsert.parentNode.insertBefore(element, elementRightAfterWhichToInsert.nextSibling)
}

const iterationFrameIterator = () => {
	const iterationSettings = store.mainHoundstooth.basePattern.iterationSettings
	const endIterationFrame = iterationSettings && iterationSettings.endIterationFrame || 0
	const frameCount = endIterationFrame + 1

	return codeUtilities.iterator(frameCount)
}

const deleteElementIfExists = selector => {
	const element = document.querySelector(selector)
	element && element.parentNode.removeChild(element)
}

const setElementDimensions = (element, dimensions) => {
	const oblong = dimensions instanceof Array
	const width = oblong ? dimensions[0] : dimensions
	const height = oblong ? dimensions[1] : dimensions
	element.style.width = inPx(width)
	element.style.height = inPx(height)
}

const inPx = number => `${number}px`

export default {
	insertElementRightAfter,
	iterationFrameIterator,
	deleteElementIfExists,
	setElementDimensions,
}
