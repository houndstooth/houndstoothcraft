// tslint:disable:no-unsafe-any

import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { createEffectToggle } from './createEffectToggle'
import { PageElement } from './types'

const createEffectToggles: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		const effectTogglesContainer: PageElement = document.querySelector('#effect-toggles-container')
		effectTogglesContainer.innerHTML = ''

		effects.forEach(createEffectToggle)
	}

export { createEffectToggles }
