// tslint:disable:no-unsafe-any

import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { createLabel } from './createLabel'
import { LabelElement, PageElement } from './types'

const createEffectToggle: (houndstoothEffect: Effect) => void =
	(houndstoothEffect: Effect): void => {
		console.log(houndstoothEffect.name)
		const label: LabelElement = createLabel({ houndstoothEffect })

		const effectTogglesContainer: PageElement = document.querySelector('.effect-toggles-container')
		effectTogglesContainer.appendChild(label)
	}

export { createEffectToggle }
