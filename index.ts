import * as effects from './effects'
import { attachAnimationControlHandlers, createEffectToggles, executeSelectedHoundstoothEffects } from './src'

createEffectToggles(Object.values(effects))
attachAnimationControlHandlers()
executeSelectedHoundstoothEffects().then().catch()
