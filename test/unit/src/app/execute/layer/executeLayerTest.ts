import {
	appState,
	callFunctionsPerSetting,
	executeGridAndMaybeLogging,
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
	let executeGridAndMaybeLoggingSpy: Spy

	beforeEach(() => {
		subject = executeLayer.default
		spyOn(initializePatternState, 'default')
		callFunctionsPerSettingSpy = spyOn(callFunctionsPerSetting, 'default')
		executeGridAndMaybeLoggingSpy = spyOn(executeGridAndMaybeLogging, 'default')
	})

	it('sets the current layer on the appState', async (done: DoneFn) => {
		const layer: Layer = to.Layer(12)
		appState.execute.currentLayer = to.Layer(11)

		await subject({ layer, layerFunctionObjects, patternId })

		expect(appState.execute.currentLayer).toBe(to.Layer(12))

		done()
	})

	it('executes the grid for this layer, and maybe logging', async (done: DoneFn) => {
		const layer: Layer = to.Layer(12)

		await subject({ layer, layerFunctionObjects, patternId })

		expect(executeGridAndMaybeLoggingSpy).toHaveBeenCalledWith({ patternId })

		done()
	})

	it('calls layer functions for setting, even the first layer', async (done: DoneFn) => {
		const layer: Layer = to.Layer(0)

		await subject({ layer, layerFunctionObjects, patternId })

		expect(callFunctionsPerSettingSpy).toHaveBeenCalledWith({
			settingFunctionObjects: layerFunctionObjects,
		})

		done()
	})

	it('initializes the pattern state from the app state\'s current pattern', async (done: DoneFn) => {
		const layer: Layer = to.Layer(0)

		await subject({ layer, layerFunctionObjects, patternId })

		expect(initializePatternState.default).toHaveBeenCalledWith(appState.settings.currentPattern)

		done()
	})
})
