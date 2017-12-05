import * as effects from './effects'
import {
	attachControlHandlers,
	buildSettingNamesToPathsMap,
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
buildSettingNamesToPathsMap.default()
storeMixedDownContext.default()
createEffectToggles.default(allEffects)
attachControlHandlers.default()
executeSelectedHoundstoothEffects.default()
