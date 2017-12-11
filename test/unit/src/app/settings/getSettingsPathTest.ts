// tslint:disable:no-any

import { getSettingsPath, SettingsPath, to } from '../../../../../src/indexForTest'

const subject: (_: { settingName: any }) => SettingsPath = getSettingsPath.default

describe('get settings path', () => {
	it('gets the path within the pattern structure for the setting with the given name', () => {
		expect(subject({ settingName: 'tileSize' })).toEqual(to.SettingsPath([ 'tileSettings' ]))
		expect(subject({ settingName: 'initialStripeCount' })).toEqual(to.SettingsPath([
			'stripeSettings',
			'stripePositionSettings',
			'stripeCountContinuumSettings',
		]))
	})
})
