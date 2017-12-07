import {
	callFunctionsPerSetting,
	patternState,
	setSetting,
	SettingsFunctionObject,
	to,
	Unit,
} from '../../../../../src'
import Spy = jasmine.Spy

const subject: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void = callFunctionsPerSetting.default

describe('call functions per setting', () => {
	it('updates the current pattern with the result of each settings function', () => {
		const oldTileSize: Unit = to.Unit(888)
		setSetting.default('tileSize', oldTileSize)

		const tileSizeSettingsFunctionSpy: Spy = jasmine.createSpy('tileSizeSettingsFunction')
		const newTileSize: Unit = to.Unit(999)
		tileSizeSettingsFunctionSpy.and.returnValue(newTileSize)

		const tileSizeSettingsFunctionObject: SettingsFunctionObject = {
			settingName: to.SettingsStep('tileSize'),
			settingsFunction: tileSizeSettingsFunctionSpy,
			settingsPath: to.SettingsPath([ 'tileSettings' ]),
		}

		const oldZoom: number = 42
		setSetting.default('zoom', oldZoom)

		const zoomSettingsFunctionSpy: Spy = jasmine.createSpy('zoomSettingsFunction')
		const newZoom: number = 45
		zoomSettingsFunctionSpy.and.returnValue(newZoom)

		const zoomSettingsFunctionObject: SettingsFunctionObject = {
			settingName: to.SettingsStep('zoom'),
			settingsFunction: zoomSettingsFunctionSpy,
			settingsPath: to.SettingsPath([ 'viewSettings' ]),
		}

		subject({
			settingsFunctionObjects: [
				tileSizeSettingsFunctionObject,
				zoomSettingsFunctionObject,
			],
		})

		expect(patternState.get('tileSize')).toBe(newTileSize)
		expect(patternState.get('zoom')).toBe(newZoom)
	})
})
