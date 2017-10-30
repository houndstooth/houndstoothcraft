// tslint:disable:no-unsafe-any

import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { addEffectToggle } from './addEffectToggle'

const maybeAddEffectToggles: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		if (!document.querySelector('.effect-toggles-container')) {
			effects.forEach(addEffectToggle)
		}
	}

export { maybeAddEffectToggles }
