import initialState from './src/state/initialState'
import codeUtilities from './src/utilities/codeUtilities'

global.currentState = codeUtilities.deepClone(initialState)
