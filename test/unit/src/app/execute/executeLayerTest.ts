import {
	appState,
	callFunctionsPerSetting,
	executeGridAndMaybeLogging,
	executeLayer,
	ExecuteLayerParams,
	initializePatternState,
	Layer,
	SettingsFunctionObject,
	to,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('execute layer', () => {
	let subject: (_: ExecuteLayerParams) => Promise<void>
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const thisPatternRef: number = 99

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

		await subject({ layer, layerFunctionObjects, thisPatternRef })

		expect(appState.execute.currentLayer).toBe(to.Layer(12))

		done()
	})

	it('executes the grid for this layer, and maybe logging', async (done: DoneFn) => {
		const layer: Layer = to.Layer(12)

		await subject({ layer, layerFunctionObjects, thisPatternRef })

		expect(executeGridAndMaybeLoggingSpy).toHaveBeenCalledWith({ thisPatternRef })

		done()
	})

	it('calls layer functions for settings, even the first layer', async (done: DoneFn) => {
		const layer: Layer = to.Layer(0)

		await subject({ layer, layerFunctionObjects, thisPatternRef })

		expect(callFunctionsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionObjects: layerFunctionObjects,
		})

		done()
	})

	it('initializes the pattern state from the app state\'s current pattern', async (done: DoneFn) => {
		const layer: Layer = to.Layer(0)

		await subject({ layer, layerFunctionObjects, thisPatternRef })

		expect(initializePatternState.default).toHaveBeenCalledWith(appState.settings.currentPattern)

		done()
	})
})
