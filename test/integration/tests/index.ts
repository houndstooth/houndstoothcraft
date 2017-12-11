// tslint:disable:no-unsafe-any

import { buildSettingNamesToPathsMap, executeGrid } from '../../../src/indexForTest'
import { resetAppAndPatternStates } from '../../helpers'
import {
	activateTestMarkerCanvas,
	stubProblematicNonCanvasUiActivity,
	syncExecuteGridAndMixDownContexts,
} from '../helpers'

beforeEach(() => {
	resetAppAndPatternStates()
	buildSettingNamesToPathsMap.default()

	activateTestMarkerCanvas()

	spyOn(executeGrid, 'default').and.callFake(syncExecuteGridAndMixDownContexts)
	stubProblematicNonCanvasUiActivity()
})
