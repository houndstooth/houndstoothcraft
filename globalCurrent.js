import initialState from './src/settings/initialSettings'
import codeUtilities from './src/utilities/codeUtilities'

global.current = codeUtilities.deepClone(initialState)
