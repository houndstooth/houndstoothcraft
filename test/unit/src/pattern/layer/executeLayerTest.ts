import {
	callFunctionsPerSetting,
	executeGridAndMaybeLogging,
	executeLayer,
	Layer,
	SettingsFunctionObject,
	state,
	to,
} from '../../../../../src'
import Spy = jasmine.Spy

describe('execute layer', () => {
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const startLayer: Layer = to.Layer(12)
	const thisPatternRef: number = 99

	let callFunctionsPerSettingSpy: Spy
	let executeGridAndMaybeLoggingSpy: Spy

	beforeEach(() => {
		callFunctionsPerSettingSpy = spyOn(callFunctionsPerSetting, 'default')
		executeGridAndMaybeLoggingSpy = spyOn(executeGridAndMaybeLogging, 'default')
	})

	it('sets the current layer on the state', async (done: DoneFn) => {
		const layer: Layer = to.Layer(12)
		state.currentLayer = to.Layer(11)

		await executeLayer.default({ layer, layerFunctionObjects, startLayer, thisPatternRef })

		expect(state.currentLayer).toBe(to.Layer(12))

		done()
	})

	describe('executing the grid for this layer, and maybe logging', () => {
		describe('when the current layer is at least the start layer (the first one to be actually rendered)', () => {
			it('executes', async (done: DoneFn) => {
				const layer: Layer = to.Layer(12)

				await executeLayer.default({ layer, layerFunctionObjects, startLayer, thisPatternRef })

				expect(executeGridAndMaybeLoggingSpy).toHaveBeenCalledWith({ thisPatternRef })

				done()
			})
		})

		describe('when the current layer is not yet to the start', () => {
			it('does not execute', async (done: DoneFn) => {
				const layer: Layer = to.Layer(11)

				await executeLayer.default({ layer, layerFunctionObjects, startLayer, thisPatternRef })

				expect(executeGridAndMaybeLoggingSpy).not.toHaveBeenCalled()

				done()
			})
		})
	})

	it('calls layer functions for settings, even the first layer', async (done: DoneFn) => {
		const layer: Layer = to.Layer(0)

		await executeLayer.default({ layer, layerFunctionObjects, startLayer, thisPatternRef })

		expect(callFunctionsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionObjects: layerFunctionObjects,
		})

		done()
	})
})
