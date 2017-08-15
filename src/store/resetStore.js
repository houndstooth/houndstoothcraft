import initialStore from './initialStore'
import codeUtilities from '../utilities/codeUtilities'

export default store => {
	Object.entries(initialStore.INITIAL_STORE).forEach(([ key, value ]) => {
		store[key] = codeUtilities.deepCloneMaybeNotObject(value)
	})
}
