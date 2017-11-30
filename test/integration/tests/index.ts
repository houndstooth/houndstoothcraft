// tslint:disable:no-unsafe-any

import { executeGrid, resetState, state } from '../../../src'
import { activateTestMarkerCanvas, syncExecuteGridAndMixDownContexts } from '../helpers'

beforeEach(() => {
	resetState.default(state)

	activateTestMarkerCanvas()

	spyOn(executeGrid, 'default').and.callFake(syncExecuteGridAndMixDownContexts)
})
