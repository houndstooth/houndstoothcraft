import Spy = jasmine.Spy
import {
	appState,
	composeMainHoundstooth,
	createContexts,
	Effect,
	executeAnimation,
	executePattern,
	executeSelectedEffects,
	initializeCurrentPatternFromBasePattern,
	NullarySideEffector,
	prepareFunctionObjectsPerSetting,
	SettingsFunctionObject,
	to,
} from '../../../../../src/indexForTest'

const subject: (_?: { overrides?: Effect }) => void = executeSelectedEffects.default

describe('execute selected effects', () => {
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []
	let prepareFunctionObjectsPerSettingSpy: Spy
	beforeEach(() => {
		spyOn(createContexts, 'default')
		spyOn(executePattern, 'default').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		spyOn(executeAnimation, 'default').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		spyOn(initializeCurrentPatternFromBasePattern, 'default').and.callThrough()
		prepareFunctionObjectsPerSettingSpy = spyOn(prepareFunctionObjectsPerSetting, 'default')
		prepareFunctionObjectsPerSettingSpy.and.returnValues(layerFunctionObjects, animationFunctionObjects)
	})

	it('composes the houndstooth', () => {
		spyOn(composeMainHoundstooth, 'default').and.callThrough()

		const overrides: Effect = { basePattern: { layerSettings: { endLayer: to.Layer(3) } } }
		subject({ overrides })

		expect(composeMainHoundstooth.default).toHaveBeenCalledWith({
			effects: appState.controls.selectedEffects,
			overrides,
		})
	})

	it('prepares layer functions', () => {
		subject()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionsSourcePattern: appState.settings.mainHoundstooth.layersPattern,
		})
	})

	it('prepares animation functions', () => {
		subject()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionsSourcePattern: appState.settings.mainHoundstooth.animationsPattern,
		})
	})

	it('initializes the current pattern to the composed main houndstooth\'s base pattern', () => {
		subject()

		expect(initializeCurrentPatternFromBasePattern.default).toHaveBeenCalled()
	})

	it('sets the app state\'s end layer to that of the composed main houndstooth\'s base pattern', () => {
		const overrides: Effect = { basePattern: { layerSettings: { endLayer: to.Layer(3) } } }
		subject({ overrides })

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
