// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import { documentWrapper } from '../../utilities'
import createCheckbox from './createCheckbox'
import createLabel from './createLabel'
import { InputElement, LabelElement, PageElement } from './types'

const createEffectToggle: (houndstoothEffect: NamedEffect) => void =
	(houndstoothEffect: NamedEffect): void => {
		const div: PageElement = documentWrapper.createElement('div')

		const checkbox: InputElement = createCheckbox({ houndstoothEffect })
		div.appendChild(checkbox)
		const label: LabelElement = createLabel({ houndstoothEffect })
		div.appendChild(label)

		const effectTogglesContainer: PageElement = documentWrapper.querySelector('#effect-toggles-container')
		effectTogglesContainer.appendChild(div)
	}

export default createEffectToggle
