// tslint:disable:no-unsafe-any

import { executeGrid } from '../../../src/indexForTest'
import { resetAppAndPatternStates } from '../../helpers'
import {
	activateTestMarkerCanvas,
	stubProblematicNonCanvasUiActivity,
	syncExecuteGridAndMixDownContexts,
} from '../helpers'

beforeEach(() => {
	resetAppAndPatternStates()

	activateTestMarkerCanvas()

	spyOn(executeGrid, 'default').and.callFake(syncExecuteGridAndMixDownContexts)
	stubProblematicNonCanvasUiActivity()
})
