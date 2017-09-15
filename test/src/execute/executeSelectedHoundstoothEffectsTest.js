import executeSelectedHoundstoothEffects from '../../../src/execute/executeSelectedHoundstoothEffects'
import state from '../../../state'
import resetState from '../../../src/store/resetState'
import page from '../../../src/page'
import * as executeGrid from '../../../src/execute/executeGrid'
import * as executeAnimation from '../../../src/execute/executeAnimation'
import * as prepareFunctionsPerSetting from '../../../src/execute/prepareFunctionsPerSetting'
import * as composeMainHoundstooth from '../../../src/execute/composeMainHoundstooth'

describe('execute selected houndstooth effects', () => {
	const layerFunctions = { layer: 'layer' }
	const animationFunctions = { animation: 'animation' }
	beforeEach(() => {
		resetState(state)

		spyOn(page, 'setupMixedDownCanvas')
		spyOn(page, 'setupContexts')
		spyOn(executeGrid, 'default')
		spyOn(executeAnimation, 'default')
		spyOn(prepareFunctionsPerSetting, 'default').and.returnValues(layerFunctions, animationFunctions)
	})

	it('composes the houndstooth', () => {
		spyOn(composeMainHoundstooth, 'default')

		const houndstoothOverrides = {}
		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		expect(composeMainHoundstooth.default).toHaveBeenCalledWith({
			houndstoothEffects: state.selectedHoundstoothEffects,
			houndstoothOverrides,
		})
	})

	it('prepares layer functions', () => {
		executeSelectedHoundstoothEffects()

		expect(prepareFunctionsPerSetting.default).toHaveBeenCalledWith({
			settingsFunctions: state.mainHoundstooth.layersPattern,
		})
	})

	describe('setting up for rendering', () => {
		it('includes the mixed down canvas when both mixing down and exporting', () => {
			state.mixingDown = true
			state.exportFrames = true

			executeSelectedHoundstoothEffects()

			expect(page.setupContexts).toHaveBeenCalled()
			expect(page.setupMixedDownCanvas).toHaveBeenCalled()
		})

		it('includes the mixed down canvas when only mixing down', () => {
			state.mixingDown = true

			executeSelectedHoundstoothEffects()

			expect(page.setupContexts).toHaveBeenCalled()
			expect(page.setupMixedDownCanvas).toHaveBeenCalled()
		})

		it('includes the mixed down canvas when only exporting frames', () => {
			state.exportFrames = true

			executeSelectedHoundstoothEffects()

			expect(page.setupContexts).toHaveBeenCalled()
			expect(page.setupMixedDownCanvas).toHaveBeenCalled()
		})

		it('does not include the mixed down canvas when neither mixing down nor exporting frames', () => {
			executeSelectedHoundstoothEffects()

			expect(page.setupContexts).toHaveBeenCalled()
			expect(page.setupMixedDownCanvas).not.toHaveBeenCalled()
		})
	})

	describe('when animating', () => {
		beforeEach(() => {
			state.animating = true
			executeSelectedHoundstoothEffects()
		})

		it('prepares animation functions', () => {
			expect(prepareFunctionsPerSetting.default).toHaveBeenCalledWith({
				settingsFunctions: state.mainHoundstooth.animationsPattern,
			})
		})

		it('executes an animation', () => {
			expect(executeAnimation.default).toHaveBeenCalledWith({
				animationFunctions,
				layerFunctions,
			})
		})

		it('does not execute a single grid', () => {
			expect(executeGrid.default).not.toHaveBeenCalled()
		})
	})

	describe('when not animating', () => {
		beforeEach(() => {
			state.animating = false
			executeSelectedHoundstoothEffects()
		})

		it('does not prepare animation functions', () => {
			expect(prepareFunctionsPerSetting.default.calls.all().length).toBe(1)
		})

		it('executes a single grid', () => {
			expect(executeGrid.default).toHaveBeenCalledWith({
				layerFunctions,
			})
		})

		it('does not execute an animation', () => {
			expect(executeAnimation.default).not.toHaveBeenCalled()
		})
	})
})
