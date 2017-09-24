/* eslint-disable import/no-internal-modules */

import { DEFAULT_STATE } from './src/store/defaults'
import { deepClone } from './src/utilities/codeUtilities'

const state = deepClone(DEFAULT_STATE)

export default state
