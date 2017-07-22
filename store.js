import initialState from './src/state/initialState'
import codeUtilities from './src/utilities/codeUtilities'

const currentState = codeUtilities.deepClone(initialState)
const store = { currentState }

export default store
