import Spy = jasmine.Spy
import {
	appState,
	callFunctionsPerSetting,
	completeLayers,
	executeGridAndMaybeLogging,
	executeLayer,
	executePattern,
	from,
	Layer,
	setSetting,
	SettingsFunctionObject,
	to,
} from '../../../../../src'

describe('execute pattern', () => {
	const endLayer: Layer = to.Layer(4)
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []
	beforeEach(() => {
		setSetting.default('endLayer', endLayer)
		appState.execute.patternRef = 99
	})

	it('calls the animation functions, to render based on the current frame', async (done: DoneFn) => {
		spyOn(callFunctionsPerSetting, 'default')
		spyOn(executeLayer, 'default')

		await executePattern.default({ animationFunctionObjects, layerFunctionObjects })

		expect(callFunctionsPerSetting.default).toHaveBeenCalledWith({
			settingsFunctionObjects: animationFunctionObjects,
		})

		done()
	})

	it('executes a layer for each layer from zero to the end layer, inclusive', async (done: DoneFn) => {
		const executeLayerSpy: Spy = spyOn(executeLayer, 'default')

		await executePattern.default({ animationFunctionObjects, layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(5)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(0),
			layerFunctionObjects,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(1),
			layerFunctionObjects,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(2),
			layerFunctionObjects,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(3),
			layerFunctionObjects,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(4),
			layerFunctionObjects,
			thisPatternRef: 99,
		})

		done()
	})

	// tslint:disable-next-line:max-line-length
	it('stops executing layers if the pattern ref has changed on the app state (i.e. it has been cancelled)', async (done: DoneFn) => {
		const executeLayerSpy: Spy = spyOn(executeLayer, 'default').and.callFake(({ layer }: { layer: Layer }) => {
			if (from.Layer(layer) === 2) {
				appState.execute.patternRef = appState.execute.patternRef + 1
			}
		})

		await executePattern.default({ animationFunctionObjects, layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(3)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(0),
			layerFunctionObjects,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(1),
			layerFunctionObjects,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(2),
			layerFunctionObjects,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).not.toHaveBeenCalledWith({
			layer: to.Layer(3),
			layerFunctionObjects,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).not.toHaveBeenCalledWith({
			layer: to.Layer(4),
			layerFunctionObjects,
			thisPatternRef: 99,
		})

		done()
	})

	it('completes the layers', async (done: DoneFn) => {
		spyOn(executeGridAndMaybeLogging, 'default')
		spyOn(completeLayers, 'default')

		await executePattern.default({ animationFunctionObjects, layerFunctionObjects })

		expect(completeLayers.default).toHaveBeenCalled()

		done()
	})
})