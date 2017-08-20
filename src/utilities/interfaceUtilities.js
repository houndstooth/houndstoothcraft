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
	element.style.width = inPx(dimensions[ 0 ])
	element.style.height = inPx(dimensions[ 1 ])
}

const inPx = number => `${number}px`

export default {
	insertElementRightAfter,
	iterationFrameIterator,
	deleteElementIfExists,
	setElementDimensions,
}
