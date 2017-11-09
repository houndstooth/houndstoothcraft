// tslint:disable:no-unsafe-any

import { Effect } from '../../pattern'
import { documentWrapper } from '../../utilities'
import { createEffectToggle } from './createEffectToggle'
import { PageElement } from './types'

const createEffectToggles: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		const effectTogglesContainer: PageElement = documentWrapper.querySelector('#effect-toggles-container')
		effectTogglesContainer.innerHTML = ''

		effects.forEach(createEffectToggle)
	}

export { createEffectToggles }
