import * as effects from './effects'
import { attachControlHandlers, createEffectToggles, executeSelectedHoundstoothEffects } from './src'

createEffectToggles(Object.values(effects))
attachControlHandlers()
executeSelectedHoundstoothEffects()
