// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import createEffectToggle from './createEffectToggle'
import { documentWrapper } from './windowWrapper'

const createEffectToggles: (effects: NamedEffect[]) => void =
	(effects: NamedEffect[]): void => {
		const effectTogglesContainer: HTMLElement = documentWrapper.querySelector('#effect-toggles-container')
		effectTogglesContainer.innerHTML = ''

		effects.forEach(createEffectToggle)

		const moreEffectsSoonMessage: HTMLTextAreaElement = documentWrapper.createElement('div') as HTMLTextAreaElement
		moreEffectsSoonMessage.setAttribute('id', 'more-effects-soon-message')
		moreEffectsSoonMessage.innerHTML = 'more effects coming soon'
		effectTogglesContainer.appendChild(moreEffectsSoonMessage)
	}

export default createEffectToggles
