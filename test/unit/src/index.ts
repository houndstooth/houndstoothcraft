import { resetAppAndPatternStates } from '../../helpers'
import { mockDom } from '../helpers'

beforeEach(() => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 50
	resetAppAndPatternStates()
	mockDom()
})
