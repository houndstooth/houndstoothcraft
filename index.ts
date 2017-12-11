import * as effects from './effects'
import { startUp } from './src'

startUp.default(Object.values(effects))
