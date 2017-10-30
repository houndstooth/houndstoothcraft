// tslint:disable:no-unsafe-any

import { createEffectTogglesContainer, LabelElement, PageElement } from '../page'
import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { createLabel } from './createLabel'

const addEffectToggle: (houndstoothEffect: Effect) => void =
	(houndstoothEffect: Effect): void => {
		const label: LabelElement = createLabel({ houndstoothEffect })

		// tslint:disable-next-line:max-line-length
		const effectTogglesContainer: PageElement = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
		effectTogglesContainer.appendChild(label)
	}

export { addEffectToggle }
