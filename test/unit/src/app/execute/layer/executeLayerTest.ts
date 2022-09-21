import {
	appState,
	callFunctionsPerSetting,
	executeGrid,
	executeLayer,
	ExecuteLayerParams,
	initializePatternState,
	Layer,
	SettingFunctionObject,
	to,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('execute layer', () => {
	let subject: (_: ExecuteLayerParams) => Promise<void>
	const layerFunctionObjects: SettingFunctionObject[] = []
	const patternId: number = 99

	let callFunctionsPerSettingSpy: Spy
	let executeGridSpy: Spy

	beforeEach(() => {
		subject = executeLayer.wrapper.executeLayer
		spyOn(initializePatternState, 'default')
		callFunctionsPerSettingSpy = spyOn(callFunctionsPerSetting, 'default')
		executeGridSpy = spyOn(executeGrid.wrapper, 'executeGrid')
	})

	it('sets the current layer on the appState', async () => {
		const layer: Layer = to.Layer(12)
		appState.execute.currentLayer = to.Layer(11)

		await subject({ layer, layerFunctionObjects, patternId })

		expect(appState.execute.currentLayer).toBe(to.Layer(12))
	})

	it('executes the grid for this layer, and maybe logging', async () => {
		const layer: Layer = to.Layer(12)

		await subject({ layer, layerFunctionObjects, patternId })

		expect(executeGridSpy).toHaveBeenCalledWith({ patternId })
	})

	it('calls layer functions for setting, even the first layer', async () => {
		const layer: Layer = to.Layer(0)

		await subject({ layer, layerFunctionObjects, patternId })

		expect(callFunctionsPerSettingSpy).toHaveBeenCalledWith({
			settingFunctionObjects: layerFunctionObjects,
		})
	})

	it('initializes the pattern state from the app state\'s current pattern', async () => {
		const layer: Layer = to.Layer(0)

		await subject({ layer, layerFunctionObjects, patternId })

		expect(initializePatternState.default).toHaveBeenCalledWith(appState.settings.currentPattern)
	})
})
