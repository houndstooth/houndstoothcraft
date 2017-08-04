let warnings = document.querySelector('.warnings')

if (!warnings) {
	warnings = document.createElement('div')
	warnings.classList.add('warnings')

	document.body.appendChild(warnings)
}

export default warnings
