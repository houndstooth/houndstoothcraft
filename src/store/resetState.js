import initialState from './initialState'
import codeUtilities from '../utilities/codeUtilities'

export default state => {
	Object.entries(initialState.INITIAL_STATE).forEach(([ key, value ]) => {
		state[key] = codeUtilities.deepCloneMaybeNotObject(value)
	})
}
