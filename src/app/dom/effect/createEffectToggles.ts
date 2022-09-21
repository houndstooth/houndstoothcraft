// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../../types'
import { globalWrapper } from '../../../utilities'
import { appState } from '../../appState'

import createEffectToggle from './createEffectToggle'

const createEffectToggles: (effects: NamedEffect[]) => void =
	(effects: NamedEffect[]): void => {
		effects.forEach(createEffectToggle)

		const moreEffectsSoonMessage: HTMLElement = globalWrapper.document.createElement('div') as HTMLElement
		moreEffectsSoonMessage.setAttribute('id', 'more-effect-soon-message')
		moreEffectsSoonMessage.innerHTML = 'more effects coming soon'
		appState.dom.effectTogglesContainer.appendChild(moreEffectsSoonMessage)
	}

export default createEffectToggles
