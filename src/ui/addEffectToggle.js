import { createEffectTogglesContainer } from '../page'
import { document } from '../utilities/windowWrapper'
import createLabel from './createLabel'

const addEffectToggle = houndstoothEffect => {
	const label = createLabel(houndstoothEffect)

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	effectTogglesContainer.appendChild(label)
}

export default addEffectToggle
