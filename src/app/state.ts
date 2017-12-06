import { DEFAULT_STATE } from '../defaults'
import { codeUtilities } from '../utilities'
import { State } from './types'

const state: State = codeUtilities.deepClone(DEFAULT_STATE)

export { state, DEFAULT_STATE }
