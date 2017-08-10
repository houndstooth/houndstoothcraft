let controls = document.querySelector('.controls')

if (!controls) {
	controls = document.createElement('div')
	controls.classList.add('controls')
	document.body.appendChild(controls)
}

export default controls
