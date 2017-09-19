/* eslint-disable import/no-internal-modules */

import { INITIAL_STATE } from './src/store/initialState'
import { deepClone } from './src/utilities/codeUtilities'

const state = deepClone(INITIAL_STATE)

export default state
