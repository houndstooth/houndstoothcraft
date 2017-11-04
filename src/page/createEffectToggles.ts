// tslint:disable:no-unsafe-any

import { Effect } from '../store'
import { createEffectToggle } from './createEffectToggle'

const createEffectToggles: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		effects.forEach(createEffectToggle)
	}

export { createEffectToggles }
