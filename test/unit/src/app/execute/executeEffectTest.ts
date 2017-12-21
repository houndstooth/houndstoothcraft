import Spy = jasmine.Spy
import {
	appState,
	combineEffects,
	composeMainHoundstooth,
	createContexts,
	Effect,
	executeAnimation,
	executeEffect,
	executePattern,
	initializeCurrentPatternFromBasePattern,
	prepareFunctionObjectsPerSetting,
	SettingFunctionObject,
	to,
	updateOverrideNodes,
	updateOverrides,
} from '../../../../../src/indexForTest'

describe('execute effect', () => {
	let subject: (_?: { overrides?: Effect }) => void
	const layerFunctionObjects: SettingFunctionObject[] = []
	const animationFunctionObjects: SettingFunctionObject[] = []
	let prepareFunctionObjectsPerSettingSpy: Spy
	beforeEach(() => {
		subject = executeEffect.default
		spyOn(createContexts, 'default')
		spyOn(updateOverrides, 'default')
		spyOn(updateOverrideNodes, 'default')
		spyOn(executePattern, 'default').and.returnValue(new Promise<() => void>((): void => undefined))
		spyOn(executeAnimation, 'default').and.returnValue(new Promise<() => void>((): void => undefined))
		spyOn(initializeCurrentPatternFromBasePattern, 'default').and.callThrough()
		prepareFunctionObjectsPerSettingSpy = spyOn(prepareFunctionObjectsPerSetting, 'default')
		prepareFunctionObjectsPerSettingSpy.and.returnValues(layerFunctionObjects, animationFunctionObjects)
	})

	it('combines the effect', () => {
		spyOn(combineEffects, 'default')

		subject()

		expect(combineEffects.default).toHaveBeenCalled()
	})

	it('composes the houndstooth', () => {
		spyOn(composeMainHoundstooth, 'default')

		subject()

		expect(composeMainHoundstooth.default).toHaveBeenCalled()
	})

	it('updates the override nodes', () => {
		subject()

		expect(updateOverrideNodes.default).toHaveBeenCalled()
	})

	it('updates the override', () => {
		subject()

		expect(updateOverrides.default).toHaveBeenCalled()
	})

	it('prepares layer functions', () => {
		subject()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingFunctionsSourcePattern: appState.settings.mainHoundstooth.layersPattern,
		})
	})

	it('prepares animation functions', () => {
		subject()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingFunctionsSourcePattern: appState.settings.mainHoundstooth.animationsPattern,
		})
	})

	it('initializes the current pattern to the composed main houndstooth\'s base pattern', () => {
		subject()

		expect(initializeCurrentPatternFromBasePattern.default).toHaveBeenCalled()
	})

	it('sets the app state\'s end layer to that of the composed main houndstooth\'s base pattern', () => {
		appState.settings.overrides = { basePattern: { layerSettings: { endLayer: to.Layer(3) } } }

		subject()

		expect(appState.controls.endLayer).toBe(to.Layer(3))
	})

	it('sets up for rendering', () => {
		subject()

		expect(createContexts.default).toHaveBeenCalled()
	})

	describe('when animating', () => {
		beforeEach(() => {
			appState.controls.animating = true

			subject()
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

			subject()
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
