// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import { appState } from '../appState'
import createCheckbox from './createCheckbox'
import createLabel from './createLabel'
import { documentWrapper } from './windowWrapper'

const createEffectToggle: (effect: NamedEffect) => void =
	(effect: NamedEffect): void => {
		const div: HTMLElement = documentWrapper.createElement('div')

		const checkbox: HTMLInputElement = createCheckbox({ effect })
		div.appendChild(checkbox)
		const label: HTMLLabelElement = createLabel({ effect })
		div.appendChild(label)

		const effectTogglesContainer: HTMLElement = documentWrapper.querySelector('#effect-toggles-container')
		effectTogglesContainer.appendChild(div)
		appState.dom.effectToggles[effect.name] = checkbox
	}

export default createEffectToggle
