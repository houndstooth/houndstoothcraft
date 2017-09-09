import executeSelectedHoundstoothEffects from '../../../src/execute/executeSelectedHoundstoothEffects'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import display from '../../../src/display'

describe('execute selected houndstooth effects', () => {
	let executeGridSpy
	beforeEach(() => {
		resetStore(store)

		executeGridSpy = jasmine.createSpy()
		executeSelectedHoundstoothEffects.__Rewire__('executeGrid', executeGridSpy)
	})

	it('composes the houndstooth', () => {
		const composeMainHoundstoothSpy = jasmine.createSpy()
		executeSelectedHoundstoothEffects.__Rewire__('composeMainHoundstooth', composeMainHoundstoothSpy)

		const houndstoothOverrides = {}
		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		expect(composeMainHoundstoothSpy.calls.all()[0].args[0]).toEqual({
			houndstoothEffects: store.selectedHoundstoothEffects,
			houndstoothOverrides,
		})

		executeSelectedHoundstoothEffects.__ResetDependency__('composeMainHoundstooth')
	})

	describe('setting up for rendering', () => {
		let setupContextsSpy, setupMixedDownCanvasSpy
		beforeEach(() => {
			setupMixedDownCanvasSpy = spyOn(display, 'setupMixedDownCanvas')
			setupContextsSpy = spyOn(display, 'setupContexts')
		})

		it('includes the mixed down canvas when both mixing down and exporting', () => {
			store.mixingDown = true
			store.exportFrames = true

			executeSelectedHoundstoothEffects()

			expect(setupContextsSpy).toHaveBeenCalled()
			expect(setupMixedDownCanvasSpy).toHaveBeenCalled()
		})

		it('includes the mixed down canvas when only mixing down', () => {
			store.mixingDown = true

			executeSelectedHoundstoothEffects()

			expect(setupContextsSpy).toHaveBeenCalled()
			expect(setupMixedDownCanvasSpy).toHaveBeenCalled()
		})

		it('includes the mixed down canvas when only exporting frames', () => {
			store.exportFrames = true

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
