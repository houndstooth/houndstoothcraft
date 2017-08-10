import warnings from './setupWarnings'

export default warningMessage => {
	const warning = document.createElement('div')
	warning.innerHTML = warningMessage
	warnings.appendChild(warning)
}
