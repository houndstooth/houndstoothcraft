import buildClickHandler from './buildClickHandler'
import setupEffectTogglesContainer from './setupEffectTogglesContainer'

export default houndstoothEffect => {
	const label = document.createElement('label')
	label.style.cursor = 'pointer'
	label.style.display = 'block'

	const checkbox = document.createElement('input')
	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'))
	checkbox.onclick = buildClickHandler(checkbox, houndstoothEffect)
	checkbox.style.cursor = 'pointer'
	label.appendChild(checkbox)

	const name = document.createTextNode(houndstoothEffect.name)
	label.appendChild(name)

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || setupEffectTogglesContainer()
	effectTogglesContainer.appendChild(label)
}
