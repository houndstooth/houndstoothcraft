import { defaults, State } from './store'
import { deepClone } from './utilities/codeUtilities'

const state: State = deepClone(defaults.DEFAULT_STATE)

export { state }
