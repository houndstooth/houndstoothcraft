import { resetState } from '../../../src'
import { state } from '../../../src'

beforeEach(() => {
	resetState(state)
	state.syncMode = true
})
