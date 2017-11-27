import * as effects from './effects'
import { attachControlHandlers, createEffectToggles, executeSelectedHoundstoothEffects } from './src'

createEffectToggles.default(Object.values(effects))
attachControlHandlers.default()
executeSelectedHoundstoothEffects.default()
