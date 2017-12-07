// tslint:disable:no-unsafe-any

import { buildSettingNamesToPathsMap, executeGrid } from '../../../src'
import { resetAppAndPatternStates } from '../../helpers'
import { activateTestMarkerCanvas, syncExecuteGridAndMixDownContexts } from '../helpers'

beforeEach(() => {
	resetAppAndPatternStates()
	buildSettingNamesToPathsMap.default()

	activateTestMarkerCanvas()

	spyOn(executeGrid, 'default').and.callFake(syncExecuteGridAndMixDownContexts)
})
