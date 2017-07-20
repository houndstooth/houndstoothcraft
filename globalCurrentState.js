import initialState from './src/settings/initialState'
import codeUtilities from './src/utilities/codeUtilities'

global.currentState = codeUtilities.deepClone(initialState)
