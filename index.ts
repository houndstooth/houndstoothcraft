import * as effects from './effects'
import {
	attachControlHandlers,
	availableEffects,
	createEffectToggles,
	executeSelectedHoundstoothEffects,
	NamedEffect,
	storeMixedDownContext,
} from './src'

const allEffects: NamedEffect[] = Object.values(effects)

availableEffects.set(allEffects)
storeMixedDownContext.default()
createEffectToggles.default(allEffects)
attachControlHandlers.default()
executeSelectedHoundstoothEffects.default()
