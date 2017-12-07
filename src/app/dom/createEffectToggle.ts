// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import { appState } from '../appState'
import createCheckbox from './createCheckbox'
import createLabel from './createLabel'
import { InputElement, LabelElement, PageElement } from './types'
import { documentWrapper } from './windowWrapper'

const createEffectToggle: (effect: NamedEffect) => void =
	(effect: NamedEffect): void => {
		const div: PageElement = documentWrapper.createElement('div')

		const checkbox: InputElement = createCheckbox({ effect })
		div.appendChild(checkbox)
		const label: LabelElement = createLabel({ effect })
		div.appendChild(label)

		const effectTogglesContainer: PageElement = documentWrapper.querySelector('#effect-toggles-container')
		effectTogglesContainer.appendChild(div)
		appState.dom.effectToggles[effect.name] = checkbox
	}

export default createEffectToggle
