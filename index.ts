import * as effects from './effects'
import { executeSelectedHoundstoothEffects, maybeAddEffectToggles } from './src'

maybeAddEffectToggles(Object.values(effects))
executeSelectedHoundstoothEffects()
