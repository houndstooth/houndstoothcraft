import { buildSettingNamesToPathsMap } from '../../../src'
import { resetAppAndPatternStates } from '../../helpers'
import { mockDomElements } from '../helpers'

beforeEach(() => {
	resetAppAndPatternStates()
	buildSettingNamesToPathsMap.default()
	mockDomElements()
})
