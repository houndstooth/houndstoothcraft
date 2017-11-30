import {
	buildAnimationFunction,
	callFunctionsPerSetting,
	clearContexts,
	executePattern,
	exportCanvas,
	mixDownContexts,
	NullaryVoidPromise,
	setSetting,
	SettingsFunctionObject,
	state,
	to,
} from '../../../../../src'
import Spy = jasmine.Spy

describe('build animation function returns an animation function', () => {
	let animationFunction: NullaryVoidPromise
	let executePatternSpy: Spy
	let clearContextsSpy: Spy

	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []

	beforeEach(() => {
		executePatternSpy = spyOn(executePattern, 'default')
		spyOn(callFunctionsPerSetting, 'default')
		clearContextsSpy = spyOn(clearContexts, 'default')
		spyOn(exportCanvas, 'default')
		spyOn(mixDownContexts, 'default')
		state.currentFrame = to.Frame(5)
		animationFunction = buildAnimationFunction.default({
			animationFunctionObjects,
			layerFunctionObjects,
		})
	})

	describe('when the current frame has not yet completed', () => {
		beforeEach(async (done: DoneFn) => {
			state.tilesCompleted = 255

			await animationFunction()

			done()
		})

		it('does not execute the grid', () => {
			expect(executePatternSpy).not.toHaveBeenCalled()
		})

		it('does not increment the current frame', () => {
			expect(state.currentFrame).toBe(to.Frame(5))
		})

		it('does not update the settings for the next frame', () => {
			expect(callFunctionsPerSetting.default).not.toHaveBeenCalled()
		})

		it('does not mix down contexts', () => {
			expect(mixDownContexts.default).not.toHaveBeenCalled()
		})

		it('does not export a frame', () => {
			expect(exportCanvas.default).not.toHaveBeenCalled()
		})
	})

	describe('when the current frame has been completed', () => {
		beforeEach(async (done: DoneFn) => {
			state.tilesCompleted = 0

			await animationFunction()

			done()
		})

		it('executes a grid with the layer functions', () => {
			expect(executePatternSpy).toHaveBeenCalledWith({ layerFunctionObjects })
		})

		it('increments the current frame', () => {
			expect(state.currentFrame).toBe(to.Frame(6))
		})

		it('updates settings for the next frame', () => {
			expect(callFunctionsPerSetting.default).toHaveBeenCalledWith({
				settingsFunctionObjects: animationFunctionObjects,
			})
		})

		describe('exporting frames', () => {
			it('does not export frames by default', () => {
				expect(exportCanvas.default).not.toHaveBeenCalled()
			})

			it('exports frames if configured to', async (done: DoneFn) => {
				state.exportFrames = true

				await animationFunction()

				expect(exportCanvas.default).toHaveBeenCalled()

				done()
			})
		})

		describe('canvas clearing', () => {
			it('clears the canvas by default', () => {
				expect(clearContextsSpy).toHaveBeenCalled()
			})

			it('does not clear the canvas if refreshing the canvas is off', async (done: DoneFn) => {
				setSetting.default('refreshCanvas', false)
				clearContextsSpy.calls.reset()
				setSetting.default('startFrame', to.Frame(0))

				await animationFunction()

				expect(clearContextsSpy).not.toHaveBeenCalled()

				done()
			})
		})

		it('mixes down contexts', () => {
			expect(mixDownContexts.default).toHaveBeenCalled()
		})
	})

	describe('starting to show the animation at a frame besides the first one', () => {
		it('does not execute the grid if the current frame is less than the start frame', async (done: DoneFn) => {
			state.currentFrame = to.Frame(5)
			setSetting.default('startFrame', to.Frame(8))

			await animationFunction()

			expect(executePatternSpy).not.toHaveBeenCalled()

			done()
		})
	})
})
