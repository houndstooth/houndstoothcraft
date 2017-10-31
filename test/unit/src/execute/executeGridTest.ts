import Spy = jasmine.Spy
import * as canvas from '../../../../src/canvas'
import { executeGrid } from '../../../../src/execute/executeGrid'
import * as executeLayer from '../../../../src/execute/executeLayer'
import * as gridAndMaybeLogging from '../../../../src/execute/gridAndMaybeLogging'
import { Layer, SettingsFunctionObject } from '../../../../src/execute/types'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'

describe('execute grid', () => {
	const startLayer: Layer = to.Layer(2)
	const endLayer: Layer = to.Layer(4)
	const layerFunctionObjects: SettingsFunctionObject[] = []
	beforeEach(() => {
		setSetting('startLayer', startLayer)
		setSetting('endLayer', endLayer)
	})

	// tslint:disable-next-line:max-line-length
	it('executes a layer for each layer from zero (not the start layer; that\'s just what gets shown, but the processing leading up to it still needs to happen) to the end layer, inclusive', () => {
		const executeLayerSpy: Spy = spyOn(executeLayer, 'executeLayer')

		executeGrid({ layerFunctionObjects })

		expect(executeLayerSpy.calls.all().length).toBe(5)
		expect(executeLayerSpy).toHaveBeenCalledWith({
			currentLayer: to.Layer(0),
			endLayer,
			layerFunctionObjects,
			startLayer,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			currentLayer: to.Layer(1),
			endLayer,
			layerFunctionObjects,
			startLayer,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			currentLayer: to.Layer(2),
			endLayer,
			layerFunctionObjects,
			startLayer,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			currentLayer: to.Layer(3),
			endLayer,
			layerFunctionObjects,
			startLayer,
		})
		expect(executeLayerSpy).toHaveBeenCalledWith({
			currentLayer: to.Layer(4),
			endLayer,
			layerFunctionObjects,
			startLayer,
		})
	})

	it('resets the current layer to zero', () => {
		spyOn(gridAndMaybeLogging, 'gridAndMaybeLogging')

		executeGrid({ layerFunctionObjects })

		expect(state.currentLayer).toBe(to.Layer(0))
	})

	describe('mixing down', () => {
		beforeEach(() => {
			spyOn(executeLayer, 'executeLayer')
			spyOn(canvas, 'mixDownContexts')
		})

		it('can mix down all contexts to one', () => {
			state.mixingDown = true

			executeGrid({ layerFunctionObjects })

			expect(canvas.mixDownContexts).toHaveBeenCalled()
		})

		it('does not bother if not asked', () => {
			executeGrid({ layerFunctionObjects })

			expect(canvas.mixDownContexts).not.toHaveBeenCalled()
		})
	})
})
