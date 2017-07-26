import initialStore from '../../src/store/initialStore'
import codeUtilities from '../../src/utilities/codeUtilities'

export default store => {
	Object.entries(initialStore.INITIAL_STORE).forEach(([ key, value ]) => {
		store[key] = codeUtilities.deepCloneMaybeNotObject(value)
	})
}
