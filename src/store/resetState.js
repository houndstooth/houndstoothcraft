import initialState from './initialState'
import { deepCloneMaybeNotObject } from '../utilities/codeUtilities'

export default state => {
	Object.entries(initialState.INITIAL_STATE).forEach(([ key, value ]) => {
		state[key] = deepCloneMaybeNotObject(value)
	})
}
