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
	deleteElementIfExists,
	setElementDimensions,
}
