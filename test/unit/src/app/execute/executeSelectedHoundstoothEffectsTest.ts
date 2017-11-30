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
		spyOn(createContexts, 'default')
		spyOn(executePattern, 'default').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		spyOn(executeAnimation, 'default').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		prepareFunctionObjectsPerSettingSpy = spyOn(prepareFunctionObjectsPerSetting, 'default')
		prepareFunctionObjectsPerSettingSpy.and.returnValues(layerFunctionObjects, animationFunctionObjects)
	})

	it('composes the houndstooth', () => {
		spyOn(composeMainHoundstooth, 'default')

		const houndstoothOverrides: Effect = {}
		executeSelectedHoundstoothEffects.default({ houndstoothOverrides })

		expect(composeMainHoundstooth.default).toHaveBeenCalledWith({
			houndstoothEffects: state.selectedHoundstoothEffects,
			houndstoothOverrides,
		})
	})

	it('prepares layer functions', () => {
		executeSelectedHoundstoothEffects.default()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
		})
	})

	it('initializes the current pattern to the composed main houndstooth\'s base pattern', () => {
		executeSelectedHoundstoothEffects.default()

		expect(state.currentPattern).toEqual(state.mainHoundstooth.basePattern)
	})

	it('sets up for rendering', () => {
		executeSelectedHoundstoothEffects.default()

		expect(createContexts.default).toHaveBeenCalled()
	})

	describe('when animating', () => {
		beforeEach(() => {
			state.animating = true

			executeSelectedHoundstoothEffects.default()
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
			expect(executePattern.default).not.toHaveBeenCalled()
		})
	})

	describe('when not animating', () => {
		beforeEach(() => {
			state.animating = false

			executeSelectedHoundstoothEffects.default()
		})

		it('does not prepare animation functions', () => {
			expect(prepareFunctionObjectsPerSettingSpy.calls.all().length).toBe(1)
		})

		it('executes a single grid', () => {
			expect(executePattern.default).toHaveBeenCalledWith({
				layerFunctionObjects,
			})
		})

		it('does not execute an animation', () => {
			expect(executeAnimation.default).not.toHaveBeenCalled()
		})
	})
})
