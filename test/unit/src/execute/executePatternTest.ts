import Spy = jasmine.Spy
import * as executeGridAndMaybeLogging from '../../../../src/execute/executeGridAndMaybeLogging'
import * as executeLayer from '../../../../src/execute/executeLayer'
import { executePattern } from '../../../../src/execute/executePattern'
import { Layer, SettingsFunctionObject } from '../../../../src/execute/types'
import * as render from '../../../../src/render'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as from from '../../../../src/utilities/from'
import * as to from '../../../../src/utilities/to'

describe('execute pattern', () => {
	const startLayer: Layer = to.Layer(2)
	const endLayer: Layer = to.Layer(4)
	const layerFunctionObjects: SettingsFunctionObject[] = []
	beforeEach(() => {
		setSetting('startLayer', startLayer)
		setSetting('endLayer', endLayer)
		state.patternRef = 99
	})

	// tslint:disable-next-line:max-line-length
	it('executes a layer for each layer from zero (not the start layer; that\'s just what gets shown, but the processing leading up to it still needs to happen) to the end layer, inclusive', async (done: DoneFn) => {
		const executeLayerSpy: Spy = spyOn(executeLayer, 'executeLayer')

		await executePattern({ layerFunctionObjects })

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
		const executeLayerSpy: Spy = spyOn(executeLayer, 'executeLayer').and.callFake(({ layer }: { layer: Layer }) => {
			if (from.Layer(layer) === 2) {
				state.patternRef = state.patternRef + 1
			}
		})

		await executePattern({ layerFunctionObjects })

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
		spyOn(executeGridAndMaybeLogging, 'executeGridAndMaybeLogging')

		await executePattern({ layerFunctionObjects })

		expect(state.currentLayer).toBe(to.Layer(0))

		done()
	})

	describe('mixing down', () => {
		beforeEach(() => {
			spyOn(executeLayer, 'executeLayer')
			spyOn(render, 'mixDownContexts')
		})

		it('can mix down all contexts to one', async (done: DoneFn) => {
			state.mixingDown = true

			await executePattern({ layerFunctionObjects })

			expect(render.mixDownContexts).toHaveBeenCalled()

			done()
		})

		it('does not bother if not asked', async (done: DoneFn) => {
			await executePattern({ layerFunctionObjects })

			expect(render.mixDownContexts).not.toHaveBeenCalled()

			done()
		})
	})
})
