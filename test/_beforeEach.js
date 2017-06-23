import 'jasmine'
import state from '../src/state/state'

beforeEach(() => {
	Object.keys(state).forEach(key => state[key] = {})
})