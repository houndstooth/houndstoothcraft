import {
	appState,
	callFunctionsPerSetting,
	composeMainHoundstooth,
	Effect,
	initializeCurrentPatternFromBasePattern,
	SettingsFunctionObject,
	to,
	Unit,
} from '../../../../../src'
import Spy = jasmine.Spy

const subject: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void = callFunctionsPerSetting.default

describe('call functions per setting', () => {
	it('updates the current pattern with the result of each settings function', () => {
		const oldTileSize: Unit = to.Unit(888)
		const tileSizeSettingsFunctionSpy: Spy = jasmine.createSpy('tileSizeSettingsFunction')
		const newTileSize: Unit = to.Unit(999)
		tileSizeSettingsFunctionSpy.and.returnValue(newTileSize)
		const tileSizeSettingsFunctionObject: SettingsFunctionObject = {
			settingName: to.SettingsStep('tileSize'),
			settingsFunction: tileSizeSettingsFunctionSpy,
			settingsPath: to.SettingsPath([ 'tileSettings' ]),
		}

		const oldZoom: number = 42
		const zoomSettingsFunctionSpy: Spy = jasmine.createSpy('zoomSettingsFunction')
		const newZoom: number = 45
		zoomSettingsFunctionSpy.and.returnValue(newZoom)
		const zoomSettingsFunctionObject: SettingsFunctionObject = {
			settingName: to.SettingsStep('zoom'),
			settingsFunction: zoomSettingsFunctionSpy,
			settingsPath: to.SettingsPath([ 'viewSettings' ]),
		}

		const overrides: Effect = {
			basePattern: {
				tileSettings: {
					tileSize: oldTileSize,
				},
				viewSettings: {
					zoom: oldZoom,
				},
			},
		}
		composeMainHoundstooth.default({ overrides })
		initializeCurrentPatternFromBasePattern.default()

		subject({
			settingsFunctionObjects: [
				tileSizeSettingsFunctionObject,
				zoomSettingsFunctionObject,
			],
		})

		expect(tileSizeSettingsFunctionSpy).toHaveBeenCalledWith(oldTileSize)
		expect(zoomSettingsFunctionSpy).toHaveBeenCalledWith(oldZoom)

		expect(appState.settings.currentPattern.tileSettings.tileSize).toBe(newTileSize)
		expect(appState.settings.currentPattern.viewSettings.zoom).toBe(newZoom)
	})
})
