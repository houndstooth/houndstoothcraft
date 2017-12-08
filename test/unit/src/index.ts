import { buildSettingNamesToPathsMap } from '../../../src'
import { resetAppAndPatternStates } from '../../helpers'
import { mockDom } from '../helpers'

beforeEach(() => {
	resetAppAndPatternStates()
	buildSettingNamesToPathsMap.default()
	mockDom()
})
