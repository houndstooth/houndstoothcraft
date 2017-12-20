import Spy = jasmine.Spy
import {
	appState,
	callFunctionsPerSetting,
	completeLayers,
	executeFrame,
	executeGridAndMaybeLogging,
	executeLayer,
	ExecuteParams,
	from,
	Layer,
	SettingFunctionObject,
	to,
} from '../../../../../src/indexForTest'

describe('execute frame', () => {
	let subject: (_: ExecuteParams) => Promise<void>
	const endLayer: Layer = to.Layer(4)
	const layerFunctionObjects: SettingFunctionObject[] = []
	const animationFunctionObjects: SettingFunctionObject[] = []
	beforeEach(() => {
		subject = executeFrame.default
		appState.controls.endLayer = endLayer
		appState.execute.frameId = 99
	})

	it('calls the animation functions, to render based on the current frame', async (done: DoneFn) => {
		spyOn(callFunctionsPerSetting, 'default')
		spyOn(executeLayer, 'default')

		await subject({ animationFunctionObjects, layerFunctionObjects })

		expect(callFunctionsPerSetting.default).toHaveBeenCalledWith({
			settingFunctionObjects: animationFunctionObjects,
		})

		done()
	})

	it('executes a layer for each layer from zero to the end layer, inclusive', async (done: DoneFn) => {
		const executeLayerSpy: Spy = spyOn(executeLayer, 'default')

		await subject({ animationFunctionObjects, layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(5)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(0),
			layerFunctionObjects,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(1),
			layerFunctionObjects,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(2),
			layerFunctionObjects,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(3),
			layerFunctionObjects,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(4),
			layerFunctionObjects,
		})

		done()
	})

	// tslint:disable-next-line:max-line-length
	it('stops executing layers if the frame id has changed on the app state (i.e. it has been cancelled)', async (done: DoneFn) => {
		const executeLayerSpy: Spy = spyOn(executeLayer, 'default').and.callFake(({ layer }: { layer: Layer }) => {
			if (from.Layer(layer) === 2) {
				appState.execute.frameId = appState.execute.frameId + 1
			}
		})

		await subject({ animationFunctionObjects, layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(3)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(0),
			layerFunctionObjects,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(1),
			layerFunctionObjects,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(2),
			layerFunctionObjects,
		})
		expect(executeLayerSpy).not.toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(3),
			layerFunctionObjects,
		})
		expect(executeLayerSpy).not.toHaveBeenCalledWith({
			frameId: 99,
			layer: to.Layer(4),
			layerFunctionObjects,
		})

		done()
	})

	it('completes the layers', async (done: DoneFn) => {
		spyOn(executeGridAndMaybeLogging, 'default')
		spyOn(completeLayers, 'default')

		await subject({ animationFunctionObjects, layerFunctionObjects })

		expect(completeLayers.default).toHaveBeenCalled()

		done()
	})
})
