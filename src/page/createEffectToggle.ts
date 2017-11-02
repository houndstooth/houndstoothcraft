// tslint:disable:no-unsafe-any

import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { createEffectTogglesContainer } from './createEffectTogglesContainer'
import { createLabel } from './createLabel'
import { LabelElement, PageElement } from './types'

const createEffectToggle: (houndstoothEffect: Effect) => void =
	(houndstoothEffect: Effect): void => {
		const label: LabelElement = createLabel({ houndstoothEffect })

		// tslint:disable-next-line:max-line-length
		const effectTogglesContainer: PageElement = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
		effectTogglesContainer.appendChild(label)
	}

export { createEffectToggle }
