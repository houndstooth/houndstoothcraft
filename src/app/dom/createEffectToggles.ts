// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../types'
import { globalWrapper } from '../../utilities'
import createEffectToggle from './createEffectToggle'

const createEffectToggles: (effects: NamedEffect[]) => void =
	(effects: NamedEffect[]): void => {
		// tslint:disable-next-line:max-line-length
		const effectTogglesContainer: HTMLElement = globalWrapper.document.querySelector('#effect-toggles-container') as HTMLElement
		effectTogglesContainer.innerHTML = ''

		effects.forEach(createEffectToggle)

		const moreEffectsSoonMessage: HTMLElement = globalWrapper.document.createElement('div') as HTMLElement
		moreEffectsSoonMessage.setAttribute('id', 'more-effects-soon-message')
		moreEffectsSoonMessage.innerHTML = 'more effects coming soon'
		effectTogglesContainer.appendChild(moreEffectsSoonMessage)
	}

export default createEffectToggles
