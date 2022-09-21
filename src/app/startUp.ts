import { NamedEffect } from '../types'

import { createEffectToggles } from './dom'
import { executeEffect } from './execute'
import { setupAvailableEffects } from './setting'
import startUpApp from './startUpApp'

const startUp: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		startUpApp()
		startUpEffects(allEffects)
		startUpPattern()
	}

const startUpEffects: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		setupAvailableEffects.default(allEffects)
		createEffectToggles.default(allEffects)
	}

const startUpPattern: () => void =
	(): void => {
		executeEffect.default()
	}

export default startUp
