import setupWarnings from './setupWarnings'

export default warningMessage => {
	const warning = document.createElement('div')
	warning.innerHTML = warningMessage

	const warnings = document.querySelector('.warnings') || setupWarnings()

	warnings.appendChild(warning)
}
