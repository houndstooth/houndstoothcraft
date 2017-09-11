import executeSelectedHoundstoothEffects from '../../../src/execute/executeSelectedHoundstoothEffects'
import state from '../../../state'
import resetState from '../../../src/store/resetState'
import canvas from '../../../src/canvas'

describe('execute selected houndstooth effects', () => {
	let executeGridSpy, executeAnimationSpy, prepareFunctionsPerSettingSpy
	const layerFunctions = { layer: 'layer' }
	const animationFunctions = { animation: 'animation' }
	beforeEach(() => {
		resetState(state)

		executeGridSpy = jasmine.createSpy()
		executeSelectedHoundstoothEffects.__Rewire__('executeGrid', executeGridSpy)

		executeAnimationSpy = jasmine.createSpy()
		executeSelectedHoundstoothEffects.__Rewire__('executeAnimation', executeAnimationSpy)

		prepareFunctionsPerSettingSpy = jasmine.createSpy().and.returnValues(layerFunctions, animationFunctions)
		executeSelectedHoundstoothEffects.__Rewire__('prepareFunctionsPerSetting', prepareFunctionsPerSettingSpy)
	})

	it('composes the houndstooth', () => {
		const composeMainHoundstoothSpy = jasmine.createSpy()
		executeSelectedHoundstoothEffects.__Rewire__('composeMainHoundstooth', composeMainHoundstoothSpy)

		const houndstoothOverrides = {}
		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		expect(composeMainHoundstoothSpy).toHaveBeenCalledWith({
			houndstoothEffects: state.selectedHoundstoothEffects,
			houndstoothOverrides,
		})
	})

	it('prepares layer functions', () => {
		executeSelectedHoundstoothEffects()

		expect(prepareFunctionsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctions: state.mainHoundstooth.layersPattern,
		})
	})

	describe('setting up for rendering', () => {
		let setupContextsSpy, setupMixedDownCanvasSpy
		beforeEach(() => {
			setupMixedDownCanvasSpy = spyOn(canvas, 'setupMixedDownCanvas')
			setupContextsSpy = spyOn(canvas, 'setupContexts')
		})

		it('includes the mixed down canvas when both mixing down and exporting', () => {
			state.mixingDown = true
			state.exportFrames = true

			executeSelectedHoundstoothEffects()

			expect(setupContextsSpy).toHaveBeenCalled()
			expect(setupMixedDownCanvasSpy).toHaveBeenCalled()
		})

		it('includes the mixed down canvas when only mixing down', () => {
			state.mixingDown = true

			executeSelectedHoundstoothEffects()

			expect(setupContextsSpy).toHaveBeenCalled()
			expect(setupMixedDownCanvasSpy).toHaveBeenCalled()
		})

		it('includes the mixed down canvas when only exporting frames', () => {
			state.exportFrames = true

			executeSelectedHoundstoothEffects()

			expect(setupContextsSpy).toHaveBeenCalled()
			expect(setupMixedDownCanvasSpy).toHaveBeenCalled()
		})

		it('does not include the mixed down canvas when neither mixing down nor exporting frames', () => {
			executeSelectedHoundstoothEffects()

			expect(setupContextsSpy).toHaveBeenCalled()
			expect(setupMixedDownCanvasSpy).not.toHaveBeenCalled()
		})
	})

	describe('when animating', () => {
		beforeEach(() => {
			state.animating = true
			executeSelectedHoundstoothEffects()
		})

		it('prepares animation functions', () => {
			expect(prepareFunctionsPerSettingSpy).toHaveBeenCalledWith({
				settingsFunctions: state.mainHoundstooth.animationsPattern,
			})
		})

		it('executes an animation', () => {
			expect(executeAnimationSpy).toHaveBeenCalledWith({
				animationFunctions,
				layerFunctions,
			})
		})

		it('does not execute a single grid', () => {
			expect(executeGridSpy).not.toHaveBeenCalled()
		})
	})

	describe('when not animating', () => {
		beforeEach(() => {
			state.animating = false
			executeSelectedHoundstoothEffects()
		})

		it('does not prepare animation functions', () => {
			expect(prepareFunctionsPerSettingSpy.calls.all().length).toBe(1)
		})

		it('executes a single grid', () => {
			expect(executeGridSpy).toHaveBeenCalledWith({
				layerFunctions,
			})
		})

		it('does not execute an animation', () => {
			expect(executeAnimationSpy).not.toHaveBeenCalled()
		})
	})
})
