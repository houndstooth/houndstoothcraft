export default selector => {
	const element = document.querySelector(selector)
	element && element.parentNode.removeChild(element)
}
