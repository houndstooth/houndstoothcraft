import * as composeMainHoundstooth from '../../../../src/execute/composeMainHoundstooth'
import * as executeAnimation from '../../../../src/execute/executeAnimation'
import * as executeGrid from '../../../../src/execute/executeGrid'
import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import * as prepareFunctionObjectsPerSetting from '../../../../src/execute/prepareFunctionObjectsPerSetting'
import * as page from '../../../../src/page'
import state from '../../../../src/state'

describe('execute selected houndstooth effects', () => {
	const layerFunctionObjects = { layer: 'layer' }
	const animationFunctionObjects = { animation: 'animation' }
	const mixedDownCanvas = {}
	let prepareFunctionObjectsPerSettingSpy
	beforeEach(() => {
		spyOn(page, 'createMixedDownCanvas').and.returnValue(mixedDownCanvas)
		spyOn(page, 'createContexts')
		spyOn(executeGrid, 'default')
		spyOn(executeAnimation, 'default')
		prepareFunctionObjectsPerSettingSpy = spyOn(prepareFunctionObjectsPerSetting, 'default')
		prepareFunctionObjectsPerSettingSpy.and.returnValues(layerFunctionObjects, animationFunctionObjects)
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

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
		})
	})

	describe('setting up for rendering', () => {
		it('includes the mixed down canvas when both mixing down and exporting', () => {
			state.mixingDown = true
			state.exportFrames = true

			executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownCanvas).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownCanvas)
		})

		it('includes the mixed down canvas when only mixing down', () => {
			state.mixingDown = true

			executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownCanvas).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownCanvas)
		})

		it('includes the mixed down canvas when only exporting frames', () => {
			state.exportFrames = true

			executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownCanvas).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownCanvas)
		})

		it('does not include the mixed down canvas when neither mixing down nor exporting frames', () => {
			executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownCanvas).not.toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(undefined)
		})
	})

	describe('when animating', () => {
		beforeEach(() => {
			state.animating = true
			executeSelectedHoundstoothEffects()
		})

		it('prepares animation functions', () => {
			expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
				settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern,
			})
		})

		it('executes an animation', () => {
			expect(executeAnimation.default).toHaveBeenCalledWith({
				animationFunctionObjects,
				layerFunctionObjects,
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
			expect(prepareFunctionObjectsPerSettingSpy.calls.all().length).toBe(1)
		})

		it('executes a single grid', () => {
			expect(executeGrid.default).toHaveBeenCalledWith({
				layerFunctionObjects,
			})
		})

		it('does not execute an animation', () => {
			expect(executeAnimation.default).not.toHaveBeenCalled()
		})
	})
})
