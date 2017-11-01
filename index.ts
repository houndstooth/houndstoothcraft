import * as effects from './effects'
import { executeSelectedHoundstoothEffects } from './src'
import { createPage } from './src/page/createPage'

createPage(Object.values(effects))
executeSelectedHoundstoothEffects()
