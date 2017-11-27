import Spy = jasmine.Spy
import {
	executeGridAndMaybeLogging,
	executeLayer,
	executePattern,
	from,
	Layer,
	mixDownContexts,
	setSetting,
	SettingsFunctionObject,
	state,
	to,
} from '../../../../src'

describe('execute pattern', () => {
	const startLayer: Layer = to.Layer(2)
	const endLayer: Layer = to.Layer(4)
	const layerFunctionObjects: SettingsFunctionObject[] = []
	beforeEach(() => {
		setSetting.default('startLayer', startLayer)
		setSetting.default('endLayer', endLayer)
		state.patternRef = 99
	})

	// tslint:disable-next-line:max-line-length
	it('executes a layer for each layer from zero (not the start layer; that\'s just what gets shown, but the processing leading up to it still needs to happen) to the end layer, inclusive', async (done: DoneFn) => {
		const executeLayerSpy: Spy = spyOn(executeLayer, 'default')

		await executePattern.default({ layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(5)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(0),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(1),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(2),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(3),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(4),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})

		done()
	})

	it('stops executing layers if the pattern ref has changed on the state (cancelled)', async (done: DoneFn) => {
		const executeLayerSpy: Spy = spyOn(executeLayer, 'default').and.callFake(({ layer }: { layer: Layer }) => {
			if (from.Layer(layer) === 2) {
				state.patternRef = state.patternRef + 1
			}
		})

		await executePattern.default({ layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(3)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(0),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(1),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			layer: to.Layer(2),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).not.toHaveBeenCalledWith({
			layer: to.Layer(3),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})
		expect(executeLayerSpy).not.toHaveBeenCalledWith({
			layer: to.Layer(4),
			layerFunctionObjects,
			startLayer,
			thisPatternRef: 99,
		})

		done()
	})

	it('resets the current layer to zero', async (done: DoneFn) => {
		spyOn(executeGridAndMaybeLogging, 'default')

		await executePattern.default({ layerFunctionObjects })

		expect(state.currentLayer).toBe(to.Layer(0))

		done()
	})

	describe('mixing down', () => {
		let mixDownContextsSpy: Spy
		beforeEach(() => {
			spyOn(executeLayer, 'default')
			mixDownContextsSpy = spyOn(mixDownContexts, 'default')
		})

		afterEach(() => {
			mixDownContextsSpy.calls.reset()
		})

		it('can mix down all contexts to one', async (done: DoneFn) => {
			state.mixingDown = true

			await executePattern.default({ layerFunctionObjects })

			expect(mixDownContexts.default).toHaveBeenCalled()

			done()
		})

		it('does not bother if not asked', async (done: DoneFn) => {
			await executePattern.default({ layerFunctionObjects })

			expect(mixDownContexts.default).not.toHaveBeenCalled()

			done()
		})
	})
})
