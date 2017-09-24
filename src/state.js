import { defaults } from './store'
import { deepClone } from './utilities/codeUtilities'

const state = deepClone(defaults.DEFAULT_STATE)

export default state
