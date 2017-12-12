import {
	appState,
	buildAnimationFunction,
	callFunctionsPerSetting,
	clearContexts,
	ExecuteParams,
	executePattern,
	exportCanvas,
	mixDownContexts,
	NullaryVoidPromise,
	previousFrameHasFinished,
	SettingsFunctionObject,
	shouldRefreshCanvas,
	to,
	updateCurrentFrame,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('build animation function returns an animation function', () => {
	let subject: (_: ExecuteParams) => NullaryVoidPromise
	let animationFunction: NullaryVoidPromise
	let executePatternSpy: Spy
	let clearContextsSpy: Spy

	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []

	beforeEach(() => {
		subject = buildAnimationFunction.default
		executePatternSpy = spyOn(executePattern, 'default')
		spyOn(callFunctionsPerSetting, 'default')
		spyOn(updateCurrentFrame, 'default')
		clearContextsSpy = spyOn(clearContexts, 'default')
		spyOn(exportCanvas, 'default')
		spyOn(mixDownContexts, 'default')
		appState.controls.currentFrame = to.Frame(5)
		animationFunction = subject({
			animationFunctionObjects,
			layerFunctionObjects,
		})
	})

	describe('when the current frame has not yet completed', () => {
		beforeEach(async (done: DoneFn) => {
			spyOn(previousFrameHasFinished, 'default').and.returnValue(false)

			await animationFunction()

			done()
		})

		it('does not execute the grid', () => {
			expect(executePatternSpy).not.toHaveBeenCalled()
		})

		it('does not increment the current frame', () => {
			expect(updateCurrentFrame.default).not.toHaveBeenCalled()
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
			spyOn(previousFrameHasFinished, 'default').and.returnValue(true)

			await animationFunction()

			done()
		})

		it('executes a grid with the layer functions', () => {
			expect(executePatternSpy).toHaveBeenCalledWith({ animationFunctionObjects, layerFunctionObjects })
		})

		it('increments the current frame', () => {
			expect(updateCurrentFrame.default).toHaveBeenCalledWith(to.Frame(6))
		})

		describe('exporting frames', () => {
			it('does not export frames by default', () => {
				expect(exportCanvas.default).not.toHaveBeenCalled()
			})

			it('exports frames if configured to', async (done: DoneFn) => {
				appState.controls.exportFrames = true

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
				spyOn(shouldRefreshCanvas, 'default').and.returnValue(false)
				clearContextsSpy.calls.reset()

				await animationFunction()

				expect(clearContextsSpy).not.toHaveBeenCalled()

				done()
			})
		})

		it('mixes down contexts', () => {
			expect(mixDownContexts.default).toHaveBeenCalled()
		})
	})
})
