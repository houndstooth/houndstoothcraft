import initialState from './src/state/initialState'
import codeUtilities from './src/utilities/codeUtilities'

const currentState = codeUtilities.deepClone(initialState.INITIAL_STATE)
const store = { currentState }

export default store
