const deleteElementIfExists = selector => {
	const element = document.querySelector(selector)
	element && element.parentNode.removeChild(element)
}

const setElementDimensions = (element, dimensions) => {
	element.style.width = inPx(dimensions[ 0 ])
	element.style.height = inPx(dimensions[ 1 ])
}

const inPx = number => `${number}px`

const insertElementRightAfter = (element, elementRightAfterWhichToInsert) => {
	elementRightAfterWhichToInsert.parentNode.insertBefore(element, elementRightAfterWhichToInsert.nextSibling)
}

export default {
	deleteElementIfExists,
	setElementDimensions,
	insertElementRightAfter,
}
