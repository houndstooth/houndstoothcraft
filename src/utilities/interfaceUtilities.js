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

export default {
	insertElementRightAfter,
	iterationFrameIterator,
	deleteElementIfExists,
}
