const deleteElementIfExists = selector => {
	const element = document.querySelector(selector)
	element && element.parentNode.removeChild(element)
}

export default deleteElementIfExists
