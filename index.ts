import * as effects from './effects'
import {
	attachControlHandlers,
	availableEffects,
	createEffectToggles,
	executeSelectedHoundstoothEffects,
	NamedEffect,
	resetMixedDownContext,
} from './src'

const allEffects: NamedEffect[] = Object.values(effects)

availableEffects.set(allEffects)
resetMixedDownContext.default()
createEffectToggles.default(allEffects)
attachControlHandlers.default()
executeSelectedHoundstoothEffects.default()
