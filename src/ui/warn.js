import { createWarningsContainer } from '../page'

const warn = warningMessage => {
	const warning = document.createElement('div')
	warning.innerHTML = warningMessage

	const warnings = document.querySelector('.warnings-container') || createWarningsContainer()

	warnings.appendChild(warning)
}

export default warn
