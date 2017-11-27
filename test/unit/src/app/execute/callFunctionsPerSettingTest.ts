import {
	callFunctionsPerSetting,
	getSetting,
	setSetting,
	SettingsFunctionObject,
	state,
	to,
	Unit,
} from '../../../../../src'
import Spy = jasmine.Spy

const subject: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void = callFunctionsPerSetting.default

describe('call functions per setting', () => {
	let tileSizeSettingsFunctionSpy: Spy
	let zoomSettingsFunctionSpy: Spy
	const newTileSize: Unit = to.Unit(999)
	const newZoom: number = 45
	const oldTileSize: Unit = to.Unit(888)
	const oldZoom: number = 42

	beforeEach(() => {
		tileSizeSettingsFunctionSpy = jasmine.createSpy('tileSizeSettingsFunction').and.returnValue(newTileSize)
		zoomSettingsFunctionSpy = jasmine.createSpy('zoomSettingsFunction').and.returnValue(newZoom)
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

		setSetting.default('tileSize', oldTileSize)
		setSetting.default('zoom', oldZoom)

		subject({ settingsFunctionObjects })
	})

	it('calls the settings functions with the previous base pattern state', () => {
		expect(tileSizeSettingsFunctionSpy).toHaveBeenCalledWith(oldTileSize)
		expect(zoomSettingsFunctionSpy).toHaveBeenCalledWith(oldZoom)
	})

	it('updates the base pattern with the result of each settings function', () => {
		expect(getSetting.default('tileSize')).toBe(newTileSize)
		expect(getSetting.default('zoom')).toBe(newZoom)
	})

	it('also updates the current pattern with the result of each settings function', () => {
		expect(state.currentPattern.tileSettings && state.currentPattern.tileSettings.tileSize).toBe(newTileSize)
		expect(state.currentPattern.viewSettings && state.currentPattern.viewSettings.zoom).toBe(newZoom)
	})
})
