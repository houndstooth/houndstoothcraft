import { resetState, state } from '../../../src'

beforeEach(() => {
	resetState.default(state)
	state.syncMode = true
})
