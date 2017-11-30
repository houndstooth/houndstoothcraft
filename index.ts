import * as effects from './effects'
import {
	attachControlHandlers,
	createEffectToggles,
	executeSelectedHoundstoothEffects,
	resetMixedDownContext,
} from './src'

resetMixedDownContext.default()
createEffectToggles.default(Object.values(effects))
attachControlHandlers.default()
executeSelectedHoundstoothEffects.default()
