import * as effects from './effects'
import { attachControlHandlers, createEffectToggles, executeSelectedHoundstoothEffects } from './src'

createEffectToggles.main(Object.values(effects))
attachControlHandlers.main()
executeSelectedHoundstoothEffects.main()
