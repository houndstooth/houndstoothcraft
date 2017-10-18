import { state } from '../../../src/state'
import { resetState } from '../../../src/store/resetState'

beforeEach(() => {
	resetState(state)
})
