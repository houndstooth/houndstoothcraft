import Spy = jasmine.Spy
import {
	appState,
	callFunctionsPerSetting,
	completeLayers,
	executeGrid,
	executeLayer,
	ExecuteParams,
	executePattern,
	from,
	Layer,
	SettingFunctionObject,
	to,
} from '../../../../../../src/indexForTest'

describe('execute pattern', () => {
	let subject: (_: ExecuteParams) => Promise<void>
	const endLayer: Layer = to.Layer(4)
	const layerFunctionObjects: SettingFunctionObject[] = []
	const animationFunctionObjects: SettingFunctionObject[] = []
	beforeEach(() => {
		subject = executePattern.default
		appState.controls.endLayer = endLayer
		appState.execute.patternId = 99
	})

	it('calls the animation functions, to render based on the current frame', async () => {
		spyOn(callFunctionsPerSetting, 'default')
		spyOn(executeLayer.wrapper, 'executeLayer')

		await subject({ animationFunctionObjects, layerFunctionObjects })

		expect(callFunctionsPerSetting.default).toHaveBeenCalledWith({
			settingFunctionObjects: animationFunctionObjects,
		})
	})

	it('executes a layer for each layer from zero to the end layer, inclusive', async () => {
		const executeLayerSpy: Spy = spyOn(executeLayer.wrapper, 'executeLayer')

		await subject({ animationFunctionObjects, layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(5)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(0),
			layerFunctionObjects,
			patternId: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(1),
			layerFunctionObjects,
			patternId: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(2),
			layerFunctionObjects,
			patternId: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(3),
			layerFunctionObjects,
			patternId: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(4),
			layerFunctionObjects,
			patternId: 99,
		})
	})

	// tslint:disable-next-line:max-line-length
	it('stops executing layers if the frame id has changed on the app state (i.e. it has been cancelled)', async () => {
		// @ts-ignore
		const executeLayerSpy: Spy = spyOn(executeLayer.wrapper, 'executeLayer').and.callFake(({ layer }: { layer: Layer }) => {
			if (from.Layer(layer) === 2) {
				appState.execute.patternId = appState.execute.patternId + 1
			}
		})

		await subject({ animationFunctionObjects, layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(3)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(0),
			layerFunctionObjects,
			patternId: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(1),
			layerFunctionObjects,
			patternId: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(2),
			layerFunctionObjects,
			patternId: 99,
		})
		expect(executeLayerSpy).not.toHaveBeenCalledWith({
			layer: to.Layer(3),
			layerFunctionObjects,
			patternId: 99,
		})
		expect(executeLayerSpy).not.toHaveBeenCalledWith({
			layer: to.Layer(4),
			layerFunctionObjects,
			patternId: 99,
		})
	})

	it('completes the layers', async () => {
		spyOn(executeGrid.wrapper, 'executeGrid')
		spyOn(completeLayers, 'default')

		await subject({ animationFunctionObjects, layerFunctionObjects })

		expect(completeLayers.default).toHaveBeenCalled()
	})
})
