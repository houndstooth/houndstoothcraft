import { createWarningsContainer } from '../page'

export default warningMessage => {
	const warning = document.createElement('div')
	warning.innerHTML = warningMessage

	const warnings = document.querySelector('.warnings-container') || createWarningsContainer()

	warnings.appendChild(warning)
}
