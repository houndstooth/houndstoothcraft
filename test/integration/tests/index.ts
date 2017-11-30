import { executeGrid, resetState, state } from '../../../src'
import { syncExecuteGridAndMixDownContexts } from '../helpers'

beforeEach(() => {
	resetState.default(state)
	spyOn(executeGrid, 'default').and.callFake(syncExecuteGridAndMixDownContexts)
})
