import { DEFAULT_STATE } from './defaults'
import { State } from './types'
import { codeUtilities } from './utilities'

const state: State = codeUtilities.deepClone(DEFAULT_STATE)

export { state, DEFAULT_STATE }
