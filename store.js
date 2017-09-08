/* eslint-disable import/no-internal-modules */

import initialStore from './src/store/initialStore'
import codeUtilities from './src/utilities/codeUtilities'

const store = codeUtilities.deepClone(initialStore.INITIAL_STORE)

export default store
