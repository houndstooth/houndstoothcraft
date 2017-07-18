import initialState from './src/initialState'
import codeUtilities from './src/utilities/codeUtilities'

global.current = codeUtilities.deepClone(initialState)
