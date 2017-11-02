// tslint:disable:no-unsafe-any

import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { createEffectToggle } from './createEffectToggle'

const maybeCreateEffectToggles: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		if (!document.querySelector('.effect-toggles-container')) {
			effects.forEach(createEffectToggle)
		}
	}

export { maybeCreateEffectToggles }
