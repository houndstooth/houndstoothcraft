// tslint:disable:no-unsafe-any

import { buildSettingNamesToPathsMap, executeGrid } from '../../../src'
import { resetState } from '../../helpers'
import { activateTestMarkerCanvas, syncExecuteGridAndMixDownContexts } from '../helpers'

beforeEach(() => {
	resetState()
	buildSettingNamesToPathsMap.default()

	activateTestMarkerCanvas()

	spyOn(executeGrid, 'default').and.callFake(syncExecuteGridAndMixDownContexts)
})
