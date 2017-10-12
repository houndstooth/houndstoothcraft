import { createEffectTogglesContainer } from '../page'
import { document } from '../utilities/windowWrapper'
import { Houndstooth } from '../store'
import createLabel from './createLabel'

const addEffectToggle: { (houndstoothEffect: Houndstooth): void } = houndstoothEffect => {
	const label = createLabel({ houndstoothEffect })

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	effectTogglesContainer.appendChild(label)
}

export default addEffectToggle
