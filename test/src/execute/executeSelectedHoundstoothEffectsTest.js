import executeSelectedHoundstoothEffects from '../../../src/execute/executeSelectedHoundstoothEffects'
import state from '../../../state'
import resetState from '../../../src/store/resetState'
import canvas from '../../../src/canvas'

describe('execute selected houndstooth effects', () => {
	let executeGridSpy
	beforeEach(() => {
		resetState(state)

		executeGridSpy = jasmine.createSpy()
		executeSelectedHoundstoothEffects.__Rewire__('executeGrid', executeGridSpy)
	})

	it('composes the houndstooth', () => {
		const composeMainHoundstoothSpy = jasmine.createSpy()
		executeSelectedHoundstoothEffects.__Rewire__('composeMainHoundstooth', composeMainHoundstoothSpy)

		const houndstoothOverrides = {}
		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		expect(composeMainHoundstoothSpy.calls.all()[0].args[0]).toEqual({
			houndstoothEffects: state.selectedHoundstoothEffects,
			houndstoothOverrides,
		})

		executeSelectedHoundstoothEffects.__ResetDependency__('composeMainHoundstooth')
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

	// if not animating, simple

	// if animating, maybe complex, maybe break out executeAnimation to either execute or animate
})
