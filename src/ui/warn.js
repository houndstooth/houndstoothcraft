import page from '../page'

export default warningMessage => {
	const warning = document.createElement('div')
	warning.innerHTML = warningMessage

	const warnings = document.querySelector('.warnings-container') || page.createWarningsContainer()

	warnings.appendChild(warning)
}
