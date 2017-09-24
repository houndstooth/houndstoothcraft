import { createWarningsContainer } from '../page'
import { document } from '../utilities/windowWrapper'

const warn = warningMessage => {
	const warning = document.createElement('div')
	warning.innerHTML = warningMessage

	const warningsContainer = document.querySelector('.warnings-container') || createWarningsContainer()

	warningsContainer.appendChild(warning)
}

export default warn
