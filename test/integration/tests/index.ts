import { executeGrid, resetState, state } from '../../../src'
import { syncExecuteGrid } from '../helpers'

beforeEach(() => {
	resetState.default(state)
	spyOn(executeGrid, 'default').and.callFake(syncExecuteGrid)
})
