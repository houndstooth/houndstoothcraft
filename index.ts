import * as effects from './effects'
import {
	attachControlHandlers,
	createEffectToggles,
	executeSelectedHoundstoothEffects,
	NamedEffect,
	state,
	storeDomElements,
	storeMixedDownContext,
} from './src'

storeDomElements.default()

const allEffects: NamedEffect[] = Object.values(effects)
state.settings.availableEffects = allEffects
storeMixedDownContext.default()
createEffectToggles.default(allEffects)
attachControlHandlers.default()
executeSelectedHoundstoothEffects.default()
