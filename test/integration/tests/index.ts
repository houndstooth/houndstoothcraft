// tslint:disable:no-unsafe-any

import { executeGrid } from '../../../src'
import { resetState } from '../../helpers'
import { activateTestMarkerCanvas, syncExecuteGridAndMixDownContexts } from '../helpers'

beforeEach(() => {
	resetState()

	activateTestMarkerCanvas()

	spyOn(executeGrid, 'default').and.callFake(syncExecuteGridAndMixDownContexts)
})
