import buildClickHandler from './buildClickHandler'
import controls from './controls'

export default houndstoothEffect => {
	const checkbox = document.createElement('input')
	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'))
	checkbox.onclick = buildClickHandler(checkbox, houndstoothEffect)

	const span = document.createElement('span')
	span.innerHTML = houndstoothEffect.name

	const checkboxContainer = document.createElement('div')
	checkboxContainer.appendChild(checkbox)
	checkboxContainer.appendChild(span)

	controls.appendChild(checkboxContainer)
}
