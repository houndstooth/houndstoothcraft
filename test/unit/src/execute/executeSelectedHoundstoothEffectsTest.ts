import Spy = jasmine.Spy
import { SettingsFunctionObject } from '../../../../src/execute'
import * as composeMainHoundstooth from '../../../../src/execute/composeMainHoundstooth'
import * as executeAnimation from '../../../../src/execute/executeAnimation'
import * as executePattern from '../../../../src/execute/executePattern'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import * as prepareFunctionObjectsPerSetting from '../../../../src/execute/prepareFunctionObjectsPerSetting'
import * as page from '../../../../src/page'
import { state } from '../../../../src/state'
import { Effect } from '../../../../src/store/types'

describe('execute selected houndstooth effects', () => {
	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []
	const mixedDownContext: page.Context = {}
	let prepareFunctionObjectsPerSettingSpy: Spy
	beforeEach(() => {
		spyOn(page, 'createMixedDownContext').and.returnValue(mixedDownContext)
		spyOn(page, 'createContexts')
		spyOn(executePattern, 'executePattern')
		spyOn(executeAnimation, 'executeAnimation')
		prepareFunctionObjectsPerSettingSpy = spyOn(prepareFunctionObjectsPerSetting, 'prepareFunctionObjectsPerSetting')
		prepareFunctionObjectsPerSettingSpy.and.returnValues(layerFunctionObjects, animationFunctionObjects)
	})

	it('composes the houndstooth', async (done: DoneFn) => {
		spyOn(composeMainHoundstooth, 'composeMainHoundstooth')

		const houndstoothOverrides: Effect = {}
		await executeSelectedHoundstoothEffects({ houndstoothOverrides })

		expect(composeMainHoundstooth.composeMainHoundstooth).toHaveBeenCalledWith({
			houndstoothEffects: state.selectedHoundstoothEffects,
			houndstoothOverrides,
		})

		done()
	})

	it('prepares layer functions', async (done: DoneFn) => {
		await executeSelectedHoundstoothEffects()

		expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
			settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
		})

		done()
	})

	describe('setting up for rendering', () => {
		it('includes the mixed down canvas when both mixing down and exporting', async (done: DoneFn) => {
			state.mixingDown = true
			state.exportFrames = true

			await executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownContext).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)

			done()
		})

		it('includes the mixed down canvas when only mixing down', async (done: DoneFn) => {
			state.mixingDown = true

			await executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownContext).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)

			done()
		})

		it('includes the mixed down canvas when only exporting frames', async (done: DoneFn) => {
			state.exportFrames = true

			await executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownContext).toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(mixedDownContext)

			done()
		})

		it('does not include the mixed down canvas when neither mixing down nor exporting frames', async (done: DoneFn) => {
			await executeSelectedHoundstoothEffects()

			expect(page.createContexts).toHaveBeenCalled()
			expect(page.createMixedDownContext).not.toHaveBeenCalled()
			expect(state.mixedDownContext).toBe(undefined)

			done()
		})
	})

	describe('when animating', () => {
		beforeEach(async (done: DoneFn) => {
			state.animating = true

			await executeSelectedHoundstoothEffects()

			done()
		})

		it('prepares animation functions', () => {
			expect(prepareFunctionObjectsPerSettingSpy).toHaveBeenCalledWith({
				settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern,
			})
		})

		it('executes an animation', () => {
			expect(executeAnimation.executeAnimation).toHaveBeenCalledWith({
				animationFunctionObjects,
				layerFunctionObjects,
			})
		})

		it('does not execute a single grid', () => {
			expect(executePattern.executePattern).not.toHaveBeenCalled()
		})
	})

	describe('when not animating', () => {
		beforeEach(async (done: DoneFn) => {
			state.animating = false

			await executeSelectedHoundstoothEffects()

			done()
		})

		it('does not prepare animation functions', () => {
			expect(prepareFunctionObjectsPerSettingSpy.calls.all().length).toBe(1)
		})

		it('executes a single grid', () => {
			expect(executePattern.executePattern).toHaveBeenCalledWith({
				layerFunctionObjects,
			})
		})

		it('does not execute an animation', () => {
			expect(executeAnimation.executeAnimation).not.toHaveBeenCalled()
		})
	})
})
