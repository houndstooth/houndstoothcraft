// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../types'
import { globalWrapper } from '../../utilities'
import { appState } from '../appState'
import createCheckbox from './createCheckbox'
import createLabel from './createLabel'

const createEffectToggle: (effect: NamedEffect) => void =
	(effect: NamedEffect): void => {
		const div: HTMLElement = globalWrapper.document.createElement('div') as HTMLElement

		const checkbox: HTMLInputElement = createCheckbox({ effect })
		div.appendChild(checkbox)
		const label: HTMLLabelElement = createLabel({ effect })
		div.appendChild(label)

		// tslint:disable-next-line:max-line-length
		const effectTogglesContainer: HTMLElement = globalWrapper.document.querySelector('#effect-toggles-container') as HTMLElement
		effectTogglesContainer.appendChild(div)
		appState.dom.effectToggles[effect.name] = checkbox
	}

export default createEffectToggle
