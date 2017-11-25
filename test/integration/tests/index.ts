import { resetState, state } from '../../../src'

beforeEach(() => {
	resetState.main(state)
	state.syncMode = true
})
