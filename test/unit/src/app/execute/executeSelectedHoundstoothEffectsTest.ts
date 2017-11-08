import Spy = jasmine.Spy
import { SettingsFunctionObject } from '../../../../../src/app/execute'
import * as composeMainHoundstooth from '../../../../../src/app/execute/composeMainHoundstooth'
import { executeSelectedHoundstoothEffects } from '../../../../../src/app/execute/executeSelectedHoundstoothEffects'
import * as prepareFunctionObjectsPerSetting from '../../../../../src/app/execute/prepareFunctionObjectsPerSetting'
import * as page from '../../../../../src/app/page'
import * as pattern from '../../../../../src/pattern'
import { state } from '../../../../../src/state'
import { NullarySideEffector } from '../../../../../src/utilities/types'

describe('execute selected houndstooth effects', () => {
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []
	const mixedDownContext: page.Context = {}
	let prepareFunctionObjectsPerSettingSpy: Spy
	beforeEach(() => {
		spyOn(page, 'createMixedDownContext').and.returnValue(mixedDownContext)
		spyOn(page, 'createContexts')
		spyOn(pattern, 'executePattern').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		spyOn(pattern, 'executeAnimation').and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		prepareFunctionObjectsPerSettingSpy = spyOn(prepareFunctionObjectsPerSetting, 'prepareFunctionObjectsPerSetting')
		prepareFunctionObjectsPerSettingSpy.and.returnValues(layerFunctionObjects, animationFunctionObjects)
	})

	it('composes the houndstooth', () => {
		spyOn(composeMainHoundstooth, 'composeMainHoundstooth')

		const houndstoothOverrides: pattern.Effect = {}
		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		expect(composeMainHoundstooth.composeMainHoundstooth).toHaveBeenCalledWith({
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
			expect(page.createMixedDownContext).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)
		})

		it('includes the mixed down canvas when only mixing down', () => {
			state.mixingDown = true

			executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownContext).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)
		})

		it('includes the mixed down canvas when only exporting frames', () => {
			state.exportFrames = true

			executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownContext).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)
		})

		it('does not include the mixed down canvas when neither mixing down nor exporting frames', () => {
			executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownContext).not.toHaveBeenCalled()
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
			expect(pattern.executeAnimation).toHaveBeenCalledWith({
				animationFunctionObjects,
				layerFunctionObjects,
			})
		})

		it('does not execute a single grid', () => {
			expect(pattern.executePattern).not.toHaveBeenCalled()
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
			expect(pattern.executePattern).toHaveBeenCalledWith({
				layerFunctionObjects,
			})
		})

		it('does not execute an animation', () => {
			expect(pattern.executeAnimation).not.toHaveBeenCalled()
		})
	})
})
