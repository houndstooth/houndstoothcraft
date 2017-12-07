import { buildSettingNamesToPathsMap } from '../../../src'
import { resetAppAndPatternStates } from '../../helpers'

beforeEach(() => {
	resetAppAndPatternStates()
	buildSettingNamesToPathsMap.default()
})
