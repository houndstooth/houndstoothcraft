import { createEffectTogglesContainer } from '../page'
import { Houndstooth } from '../store'
import { document } from '../utilities/windowWrapper'
import createLabel from './createLabel'

const addEffectToggle: { (houndstoothEffect: Houndstooth): void } = houndstoothEffect => {
	const label = createLabel({ houndstoothEffect })

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	effectTogglesContainer.appendChild(label)
}

export default addEffectToggle
