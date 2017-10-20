import { createEffectTogglesContainer } from '../page'
import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { createLabel } from './createLabel'

const addEffectToggle: (houndstoothEffect: Effect) => void = houndstoothEffect => {
	const label = createLabel({ houndstoothEffect })

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	effectTogglesContainer.appendChild(label)
}

export { addEffectToggle }
