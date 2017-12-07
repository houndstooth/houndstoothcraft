import Spy = jasmine.Spy
import {
	appState,
	composeMainHoundstooth,
	createContexts,
	Effect,
	executeAnimation,
	executePattern,
	executeSelectedEffects,
	NullarySideEffector,
	patternState,
	prepareFunctionObjectsPerSetting,
	SettingsFunctionObject,
} from '../../../../../src'

describe('execute selected effects', () => {
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []
	let prepareFunctionObjectsPerSettingSpy: Spy
	beforeEach(() => {
		spyOn(createContexts, 'default')
		spyOn(executePattern, 'default').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		spyOn(executeAnimation, 'default').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		prepareFunctionObjectsPerSettingSpy = spyOn(prepareFunctionObjectsPerSetting, 'default')
		prepareFunctionObjectsPerSettingSpy.and.returnValues(layerFunctionObjects, animationFunctionObjects)
	})

	it('composes the houndstooth', () => {
		spyOn(composeMainHoundstooth, 'default')

		const overrides: Effect = {}
		executeSelectedEffects.default({ overrides })

		expect(composeMainHoundstooth.default).toHaveBeenCalledWith({
			effects: appState.controls.selectedEffects,
			overrides,
		})
	})

	it('prepares layer functions', () => {
		executeSelectedEffects.default()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionsSourcePattern: appState.settings.mainHoundstooth.layersPattern,
		})
	})

	it('prepares animation functions', () => {
		executeSelectedEffects.default()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionsSourcePattern: appState.settings.mainHoundstooth.animationsPattern,
		})
	})

	it('initializes the current pattern to the composed main houndstooth\'s base pattern', () => {
		executeSelectedEffects.default()

		expect(patternState.get()).toEqual(appState.settings.mainHoundstooth.basePattern)
	})

	it('sets up for rendering', () => {
		executeSelectedEffects.default()

		expect(createContexts.default).toHaveBeenCalled()
	})

	describe('when animating', () => {
		beforeEach(() => {
			appState.controls.animating = true

			executeSelectedEffects.default()
		})

		it('executes an animation', () => {
			expect(executeAnimation.default).toHaveBeenCalledWith({
				animationFunctionObjects,
				layerFunctionObjects,
			})
		})

		it('does not execute a single pattern', () => {
			expect(executePattern.default).not.toHaveBeenCalled()
		})
	})

	describe('when not animating', () => {
		beforeEach(() => {
			appState.controls.animating = false

			executeSelectedEffects.default()
		})

		it('executes a single pattern', () => {
			expect(executePattern.default).toHaveBeenCalledWith({
				animationFunctionObjects,
				layerFunctionObjects,
			})
		})

		it('does not execute an animation', () => {
			expect(executeAnimation.default).not.toHaveBeenCalled()
		})
	})
})
