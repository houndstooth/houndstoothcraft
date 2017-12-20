import {
	appState,
	callFunctionsPerSetting,
	composeMainHoundstooth,
	initializeCurrentPatternFromBasePattern,
	SettingFunctionObject,
	to,
	Unit,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('call functions per setting', () => {
	it('updates the current pattern with the result of each setting function', () => {
		const subject: (_: { settingFunctionObjects: SettingFunctionObject[] }) => void = callFunctionsPerSetting.default
		const oldTileSize: Unit = to.Unit(888)
		const tileSizeSettingFunctionSpy: Spy = jasmine.createSpy('tileSizeSettingFunction')
		const newTileSize: Unit = to.Unit(999)
		tileSizeSettingFunctionSpy.and.returnValue(newTileSize)
		const tileSizeSettingFunctionObject: SettingFunctionObject = {
			settingFunction: tileSizeSettingFunctionSpy,
			settingName: to.SettingStep('tileSize'),
			settingPath: to.SettingPath([ 'tileSettings' ]),
		}

		const oldZoom: number = 42
		const zoomSettingFunctionSpy: Spy = jasmine.createSpy('zoomSettingFunction')
		const newZoom: number = 45
		zoomSettingFunctionSpy.and.returnValue(newZoom)
		const zoomSettingFunctionObject: SettingFunctionObject = {
			settingFunction: zoomSettingFunctionSpy,
			settingName: to.SettingStep('zoom'),
			settingPath: to.SettingPath([ 'viewSettings' ]),
		}

		appState.settings.overrides = {
			basePattern: {
				tileSettings: {
					tileSize: oldTileSize,
				},
				viewSettings: {
					zoom: oldZoom,
				},
			},
		}
		composeMainHoundstooth.default()
		initializeCurrentPatternFromBasePattern.default()

		subject({
			settingFunctionObjects: [
				tileSizeSettingFunctionObject,
				zoomSettingFunctionObject,
			],
		})

		expect(tileSizeSettingFunctionSpy).toHaveBeenCalledWith(oldTileSize)
		expect(zoomSettingFunctionSpy).toHaveBeenCalledWith(oldZoom)

		expect(appState.settings.currentPattern.tileSettings.tileSize).toBe(newTileSize)
		expect(appState.settings.currentPattern.viewSettings.zoom).toBe(newZoom)
	})
})
