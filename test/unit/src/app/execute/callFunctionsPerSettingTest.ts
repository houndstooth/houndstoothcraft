import { callFunctionsPerSetting, getSetting, setSetting, SettingsFunctionObject, to, Unit } from '../../../../../src'
import Spy = jasmine.Spy

const subject: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void = callFunctionsPerSetting.default

describe('call functions per setting', () => {
	it('updates the base pattern with the result of each settings function', () => {
		const newTileSize: Unit = to.Unit(999)
		const tileSizeSettingsFunctionSpy: Spy = jasmine.createSpy('tileSizeSettingsFunction').and.returnValue(newTileSize)
		const newZoom: number = 45
		const zoomSettingsFunctionSpy: Spy = jasmine.createSpy('zoomSettingsFunction').and.returnValue(newZoom)
		const settingsFunctionObjects: SettingsFunctionObject[] = [
			{
				settingName: to.SettingsStep('tileSize'),
				settingsFunction: tileSizeSettingsFunctionSpy,
				settingsPath: to.SettingsPath([ 'tileSettings' ]),
			},
			{
				settingName: to.SettingsStep('zoom'),
				settingsFunction: zoomSettingsFunctionSpy,
				settingsPath: to.SettingsPath([ 'viewSettings' ]),
			},
		]

		const oldTileSize: Unit = to.Unit(888)
		setSetting.default('tileSize', oldTileSize)
		const oldZoom: number = 42
		setSetting.default('zoom', oldZoom)

		subject({ settingsFunctionObjects })

		expect(tileSizeSettingsFunctionSpy).toHaveBeenCalledWith(oldTileSize)
		expect(zoomSettingsFunctionSpy).toHaveBeenCalledWith(oldZoom)
		expect(getSetting.default('tileSize')).toBe(newTileSize)
		expect(getSetting.default('zoom')).toBe(newZoom)
	})
})
