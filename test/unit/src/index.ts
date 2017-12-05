import { buildSettingNamesToPathsMap } from '../../../src'
import { resetState } from '../../helpers'

beforeEach(() => {
	resetState()
	buildSettingNamesToPathsMap.default()
})
