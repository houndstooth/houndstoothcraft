import { resetState } from '../../../src/app/store/resetState'
import { state } from '../../../src/state'

beforeEach(() => {
	resetState(state)
	state.syncMode = true
})
