import { DEFAULT_APP_STATE } from '../defaults'
import { codeUtilities } from '../utilities'
import { AppState } from './types'

const appState: AppState = codeUtilities.deepClone(DEFAULT_APP_STATE)

export { appState, DEFAULT_APP_STATE }
