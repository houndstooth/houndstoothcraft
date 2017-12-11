import { buildSettingNamesToPathsMap } from '../../../src/indexForTest'
import { resetAppAndPatternStates } from '../../helpers'
import { mockDom } from '../helpers'

beforeEach(() => {
	resetAppAndPatternStates()
	buildSettingNamesToPathsMap.default()
	mockDom()
})
