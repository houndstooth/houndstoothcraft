/* eslint-disable import/no-internal-modules */

import initialState from './src/store/initialState'
import codeUtilities from './src/utilities/codeUtilities'

const state = codeUtilities.deepClone(initialState.INITIAL_STATE)

export default state
