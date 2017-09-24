import buildEffectToggleClickHandler from './buildEffectToggleClickHandler'
import { createEffectTogglesContainer } from '../page'

const addEffectToggle = houndstoothEffect => {
	const label = createLabel(houndstoothEffect)

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	effectTogglesContainer.appendChild(label)
}

const createLabel = houndstoothEffect => {
	const label = document.createElement('label')

	label.style.cursor = 'pointer'
	label.style.display = 'block'

	const checkbox = createCheckbox(houndstoothEffect)
	label.appendChild(checkbox)

	const name = document.createTextNode(houndstoothEffect.name)
	label.appendChild(name)

	return label
}

const createCheckbox = houndstoothEffect => {
	const checkbox = document.createElement('input')

	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'))
	checkbox.onclick = buildEffectToggleClickHandler(checkbox, houndstoothEffect)
	checkbox.style.cursor = 'pointer'

	return checkbox
}

export default addEffectToggle
