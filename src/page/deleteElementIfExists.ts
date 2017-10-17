import { document } from '../utilities/windowWrapper'

const deleteElementIfExists: (selector: string) => void = selector => {
	const element = document.querySelector(selector)
	if (element) {
		element.parentNode.removeChild(element)
	}
}

export default deleteElementIfExists
