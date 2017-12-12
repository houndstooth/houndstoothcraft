import { buildSettingNamesToPathsMap } from '../../../src/indexForTest'
import { resetAppAndPatternStates } from '../../helpers'
import { mockDom } from '../helpers'

beforeEach(() => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL= 50
	resetAppAndPatternStates()
	buildSettingNamesToPathsMap.default()
	mockDom()
})
