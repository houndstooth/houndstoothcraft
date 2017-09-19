/* eslint-disable import/no-internal-modules */

import initialState from './src/store/initialState'
import { deepClone } from './src/utilities/codeUtilities'

const state = deepClone(initialState.INITIAL_STATE)

export default state
