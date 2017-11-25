import Spy = jasmine.Spy
import {
	composeMainHoundstooth,
	Context,
	createContexts,
	createMixedDownContext,
	Effect,
	executeAnimation,
	executePattern,
	executeSelectedHoundstoothEffects,
	NullarySideEffector,
	prepareFunctionObjectsPerSetting,
	SettingsFunctionObject,
	state,
} from '../../../../../src'

describe('execute selected houndstooth effects', () => {
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []
	const mixedDownContext: Context = {}
	let prepareFunctionObjectsPerSettingSpy: Spy
	beforeEach(() => {
		spyOn(createMixedDownContext, 'default').and.returnValue(mixedDownContext)
		spyOn(createContexts, 'main')
		spyOn(executePattern, 'main').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		spyOn(executeAnimation, 'main').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		prepareFunctionObjectsPerSettingSpy = spyOn(prepareFunctionObjectsPerSetting, 'main')
		prepareFunctionObjectsPerSettingSpy.and.returnValues(layerFunctionObjects, animationFunctionObjects)
	})

	it('composes the houndstooth', () => {
		spyOn(composeMainHoundstooth, 'main')

		const houndstoothOverrides: Effect = {}
		executeSelectedHoundstoothEffects.main({ houndstoothOverrides })

		expect(composeMainHoundstooth.main).toHaveBeenCalledWith({
			houndstoothEffects: state.selectedHoundstoothEffects,
			houndstoothOverrides,
		})
	})

	it('prepares layer functions', () => {
		executeSelectedHoundstoothEffects.main()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
		})
	})

	describe('setting up for rendering', () => {
		it('includes the mixed down canvas when both mixing down and exporting', () => {
			state.mixingDown = true
			state.exportFrames = true

			executeSelectedHoundstoothEffects.main()

			expect(createContexts.main).toHaveBeenCalled()
			expect(createMixedDownContext.default).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)
		})

		it('includes the mixed down canvas when only mixing down', () => {
			state.mixingDown = true

			executeSelectedHoundstoothEffects.main()

			expect(createContexts.main).toHaveBeenCalled()
			expect(createMixedDownContext.default).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)
		})

		it('includes the mixed down canvas when only exporting frames', () => {
			state.exportFrames = true

			executeSelectedHoundstoothEffects.main()

			expect(createContexts.main).toHaveBeenCalled()
			expect(createMixedDownContext.default).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)
		})

		it('does not include the mixed down canvas when neither mixing down nor exporting frames', () => {
			executeSelectedHoundstoothEffects.main()

			expect(createContexts.main).toHaveBeenCalled()
			expect(createMixedDownContext.default).not.toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(undefined)
		})
	})

	describe('when animating', () => {
		beforeEach(() => {
			state.animating = true

			executeSelectedHoundstoothEffects.main()
		})

		it('prepares animation functions', () => {
			expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
				settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern,
			})
		})

		it('executes an animation', () => {
			expect(executeAnimation.main).toHaveBeenCalledWith({
				animationFunctionObjects,
				layerFunctionObjects,
			})
		})

		it('does not execute a single grid', () => {
			expect(executePattern.main).not.toHaveBeenCalled()
		})
	})

	describe('when not animating', () => {
		beforeEach(() => {
			state.animating = false

			executeSelectedHoundstoothEffects.main()
		})

		it('does not prepare animation functions', () => {
			expect(prepareFunctionObjectsPerSettingSpy.calls.all().length).toBe(1)
		})

		it('executes a single grid', () => {
			expect(executePattern.main).toHaveBeenCalledWith({
				layerFunctionObjects,
			})
		})

		it('does not execute an animation', () => {
			expect(executeAnimation.main).not.toHaveBeenCalled()
		})
	})
})
