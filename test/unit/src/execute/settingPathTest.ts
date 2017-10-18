import { settingPath } from '../../../../src/execute/settingPath'
import { PropertyPath } from '../../../../src/utilities/types'

describe('setting path', () => {
	it('appends the setting name to the path and joins all by dots', () => {
		const settingsPath = [ 'a', 'b', 'c' ] as PropertyPath
		const settingName = 'd'

		expect(settingPath({ settingsPath, settingName })).toBe('a.b.c.d')
	})
})
