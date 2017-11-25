// tslint:disable:no-unsafe-any

import { Effect } from '../../pattern'
import { documentWrapper } from '../../utilities'
import { main as createLabel } from './createLabel'
import { LabelElement, PageElement } from './types'

const createEffectToggle: (houndstoothEffect: Effect) => void =
	(houndstoothEffect: Effect): void => {
		const label: LabelElement = createLabel({ houndstoothEffect })

		const effectTogglesContainer: PageElement = documentWrapper.querySelector('#effect-toggles-container')
		effectTogglesContainer.appendChild(label)
	}

export { createEffectToggle as main }
