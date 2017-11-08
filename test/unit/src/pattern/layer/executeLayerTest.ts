import * as app from '../../../../../src/app'
import { SettingsFunctionObject } from '../../../../../src/app/execute/types'
import * as grid from '../../../../../src/pattern/grid'
import { executeLayer } from '../../../../../src/pattern/layer/executeLayer'
import Spy = jasmine.Spy
import { Layer } from '../../../../../src/pattern/layer/types'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'

describe('execute layer', () => {
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const startLayer: Layer = to.Layer(12)
	const thisPatternRef: number = 99

	let callFunctionsPerSettingSpy: Spy
	let executeGridAndMaybeLoggingSpy: Spy

	beforeEach(() => {
		callFunctionsPerSettingSpy = spyOn(app, 'callFunctionsPerSetting')
		executeGridAndMaybeLoggingSpy = spyOn(grid, 'executeGridAndMaybeLogging')
	})

	it('sets the current layer on the state', async (done: DoneFn) => {
		const layer: Layer = to.Layer(12)
		state.currentLayer = to.Layer(11)

		await executeLayer({ layer, layerFunctionObjects, startLayer, thisPatternRef })

		expect(state.currentLayer).toBe(to.Layer(12))

		done()
	})

	describe('executing the grid for this layer, and maybe logging', () => {
		describe('when the current layer is at least the start layer (the first one to be actually rendered)', () => {
			it('executes', async (done: DoneFn) => {
				const layer: Layer = to.Layer(12)

				await executeLayer({ layer, layerFunctionObjects, startLayer, thisPatternRef })

				expect(executeGridAndMaybeLoggingSpy).toHaveBeenCalledWith({ thisPatternRef })

				done()
			})
		})

		describe('when the current layer is not yet to the start', () => {
			it('does not execute', async (done: DoneFn) => {
				const layer: Layer = to.Layer(11)

				await executeLayer({ layer, layerFunctionObjects, startLayer, thisPatternRef })

				expect(executeGridAndMaybeLoggingSpy).not.toHaveBeenCalled()

				done()
			})
		})
	})

	describe('calling layer functions for settings', () => {
		describe('when it\'s the first layer', () => {
			it('does not call them', async (done: DoneFn) => {
				const layer: Layer = to.Layer(0)

				await executeLayer({ layer, layerFunctionObjects, startLayer, thisPatternRef })

				expect(callFunctionsPerSettingSpy).not.toHaveBeenCalled()

				done()
			})
		})

		describe('any later layer', () => {
			it('calls them', async (done: DoneFn) => {
				const layer: Layer = to.Layer(1)

				await executeLayer({ layer, layerFunctionObjects, startLayer, thisPatternRef })

				expect(callFunctionsPerSettingSpy).toHaveBeenCalledWith({
					settingsFunctionObjects: layerFunctionObjects,
				})

				done()
			})
		})
	})
})
