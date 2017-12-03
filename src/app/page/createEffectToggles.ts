// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import { documentWrapper } from '../../utilities'
import createEffectToggle from './createEffectToggle'
import { PageElement } from './types'

const createEffectToggles: (effects: NamedEffect[]) => void =
	(effects: NamedEffect[]): void => {
		const effectTogglesContainer: PageElement = documentWrapper.querySelector('#effect-toggles-container')
		effectTogglesContainer.innerHTML = ''

		effects.forEach(createEffectToggle)
	}

export default createEffectToggles
