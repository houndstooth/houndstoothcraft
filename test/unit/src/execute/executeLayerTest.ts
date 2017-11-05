import * as callFunctionsPerSetting from '../../../../src/execute/callFunctionsPerSetting'
import * as executeGridAndMaybeLogging from '../../../../src/execute/executeGridAndMaybeLogging'
import { executeLayer } from '../../../../src/execute/executeLayer'
import { Layer, SettingsFunctionObject } from '../../../../src/execute/types'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'
import Spy = jasmine.Spy

describe('execute layer', () => {
	const endLayer: Layer = to.Layer(15)
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const startLayer: Layer = to.Layer(12)

	let callFunctionsPerSettingSpy: Spy
	let executeGridAndMaybeLoggingSpy: Spy

	beforeEach(() => {
		callFunctionsPerSettingSpy = spyOn(callFunctionsPerSetting, 'callFunctionsPerSetting')
		executeGridAndMaybeLoggingSpy = spyOn(executeGridAndMaybeLogging, 'executeGridAndMaybeLogging')
	})

	it('sets the current layer on the state', async (done: DoneFn) => {
		const layer: Layer = to.Layer(12)
		state.currentLayer = to.Layer(11)

		await executeLayer({ layer, layerFunctionObjects, startLayer })

		expect(state.currentLayer).toBe(to.Layer(12))

		done()
	})

	describe('executing the grid for this layer, and maybe logging', () => {
		describe('when the current layer is at least the start layer (the first one to be actually rendered)', () => {
			it('executes', async (done: DoneFn) => {
				const layer: Layer = to.Layer(12)

				await executeLayer({ layer, layerFunctionObjects, startLayer })

				expect(executeGridAndMaybeLoggingSpy).toHaveBeenCalled()

				done()
			})
		})

		describe('when the current layer is not yet to the start', () => {
			it('does not execute', async (done: DoneFn) => {
				const layer: Layer = to.Layer(11)

				await executeLayer({ layer, layerFunctionObjects, startLayer })

				expect(executeGridAndMaybeLoggingSpy).not.toHaveBeenCalled()

				done()
			})
		})
	})

	describe('calling layer functions for settings', () => {
		describe('when it\'s the first layer', () => {
			it('does not call them', async (done: DoneFn) => {
				const layer: Layer = to.Layer(0)

				await executeLayer({ layer, layerFunctionObjects, startLayer })

				expect(callFunctionsPerSettingSpy).not.toHaveBeenCalled()

				done()
			})
		})

		describe('any later layer', () => {
			it('calls them', async (done: DoneFn) => {
				const layer: Layer = to.Layer(1)

				await executeLayer({ layer, layerFunctionObjects, startLayer })

				expect(callFunctionsPerSettingSpy).toHaveBeenCalledWith({
					settingsFunctionObjects: layerFunctionObjects,
				})

				done()
			})
		})
	})
})
