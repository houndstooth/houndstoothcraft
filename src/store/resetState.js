import { INITIAL_STATE } from './initialState'
import { deepCloneMaybeNotObject } from '../utilities/codeUtilities'

const resetState = state => {
	Object.entries(INITIAL_STATE).forEach(([ key, value ]) => {
		state[key] = deepCloneMaybeNotObject(value)
	})
}

export default resetState
