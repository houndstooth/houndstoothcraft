import store from '../../store'
import codeUtilities from './codeUtilities'

const layerIterator = () => {
	const layerSettings = store.mainHoundstooth.basePattern.layerSettings
	const endLayer = layerSettings && layerSettings.endLayer || 0
	const layerCount = endLayer + 1

	return codeUtilities.iterator(layerCount)
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
	layerIterator,
	deleteElementIfExists,
	setElementDimensions,
}
