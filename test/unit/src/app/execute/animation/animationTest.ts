import {
	animation,
	appState,
	clearAnimationIntervalAndRemoveFromState,
	clearContexts,
	ExecuteParams,
	executePattern,
	mixDownContexts,
	saveCanvas,
	SettingFunctionObject,
	shouldRefreshCanvas,
	to,
	updateCurrentFrame,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('animation', () => {
	let subject: (_: ExecuteParams) => Promise<void>

	let layerFunctionObjects: SettingFunctionObject[]
	let animationFunctionObjects: SettingFunctionObject[]

	let shouldRefreshCanvasSpy: Spy
	beforeEach(() => {
		subject = animation.default

		layerFunctionObjects = []
		animationFunctionObjects = []

		shouldRefreshCanvasSpy = spyOn(shouldRefreshCanvas, 'default')
		spyOn(clearContexts, 'default')
		spyOn(executePattern, 'default').and.callFake(async (): Promise<void> => undefined)
		spyOn(saveCanvas, 'default')
		spyOn(mixDownContexts, 'default')
		spyOn(updateCurrentFrame, 'default')
		spyOn(clearAnimationIntervalAndRemoveFromState, 'default')
		spyOn(appState.execute, 'resolveAnimation')

		appState.controls.currentFrame = to.Frame(44)
	})

	describe('when the animation is paused (even if the pattern is ready, tiles & layers -wise)', () => {
		beforeEach(() => {
			appState.controls.animating = false
			appState.execute.tilesCompleted = 0
			appState.execute.currentLayer = to.Layer(0)
		})

		it('does nothing', async () => {
			await subject({ animationFunctionObjects, layerFunctionObjects })

			expect(clearContexts.default).not.toHaveBeenCalled()
			expect(executePattern.default).not.toHaveBeenCalled()
			expect(saveCanvas.default).not.toHaveBeenCalled()
			expect(mixDownContexts.default).not.toHaveBeenCalled()
			expect(updateCurrentFrame.default).not.toHaveBeenCalled()
			expect(clearAnimationIntervalAndRemoveFromState.default).not.toHaveBeenCalled()
			expect(appState.execute.resolveAnimation).not.toHaveBeenCalled()
		})
	})

	// tslint:disable-next-line:max-line-length
	describe('when the previous frame is still in the middle of doing its layers (even if the tiles all happen to be done, and the animation is not paused)', () => {
		beforeEach(() => {
			appState.controls.animating = true
			appState.execute.tilesCompleted = 0
			appState.execute.currentLayer = to.Layer(3)
		})

		it('does nothing', async () => {
			await subject({ animationFunctionObjects, layerFunctionObjects })

			expect(clearContexts.default).not.toHaveBeenCalled()
			expect(executePattern.default).not.toHaveBeenCalled()
			expect(saveCanvas.default).not.toHaveBeenCalled()
			expect(mixDownContexts.default).not.toHaveBeenCalled()
			expect(updateCurrentFrame.default).not.toHaveBeenCalled()
			expect(clearAnimationIntervalAndRemoveFromState.default).not.toHaveBeenCalled()
			expect(appState.execute.resolveAnimation).not.toHaveBeenCalled()
		})
	})

	// tslint:disable-next-line:max-line-length
	describe('when the previous frame is still in the middle of doing its tiles (even if its on the first/last layer, and the animation is not paused)', () => {
		beforeEach(() => {
			appState.controls.animating = true
			appState.execute.tilesCompleted = 3
			appState.execute.currentLayer = to.Layer(0)
		})

		it('does nothing', async () => {
			await subject({ animationFunctionObjects, layerFunctionObjects })

			expect(clearContexts.default).not.toHaveBeenCalled()
			expect(executePattern.default).not.toHaveBeenCalled()
			expect(saveCanvas.default).not.toHaveBeenCalled()
			expect(mixDownContexts.default).not.toHaveBeenCalled()
			expect(updateCurrentFrame.default).not.toHaveBeenCalled()
			expect(clearAnimationIntervalAndRemoveFromState.default).not.toHaveBeenCalled()
			expect(appState.execute.resolveAnimation).not.toHaveBeenCalled()
		})
	})

	describe('when it is time to animate', () => {
		beforeEach(() => {
			appState.controls.animating = true
			appState.execute.tilesCompleted = 0
			appState.execute.currentLayer = to.Layer(0)
		})

		describe('when it should refresh', () => {
			it('does', async () => {
				shouldRefreshCanvasSpy.and.returnValue(true)

				await subject({ animationFunctionObjects, layerFunctionObjects })

				expect(clearContexts.default).toHaveBeenCalled()
			})
		})

		describe('when it should not refresh', () => {
			it('does not', async () => {
				shouldRefreshCanvasSpy.and.returnValue(false)

				await subject({ animationFunctionObjects, layerFunctionObjects })

				expect(clearContexts.default).not.toHaveBeenCalled()
			})
		})

		it('executes a pattern with the function objects', async () => {
			await subject({ animationFunctionObjects, layerFunctionObjects })

			expect(executePattern.default).toHaveBeenCalledWith({ animationFunctionObjects, layerFunctionObjects })
		})

		it('mixes down the contexts', async () => {
			await subject({ animationFunctionObjects, layerFunctionObjects })

			expect(mixDownContexts.default).toHaveBeenCalled()
		})

		describe('exporting frames', () => {
			it('saves canvas if should', async () => {
				appState.controls.exportFrames = true

				await subject({ animationFunctionObjects, layerFunctionObjects })

				expect(saveCanvas.default).toHaveBeenCalled()
			})

			it('does not if should not', async () => {
				appState.controls.exportFrames = false

				await subject({ animationFunctionObjects, layerFunctionObjects })

				expect(saveCanvas.default).not.toHaveBeenCalled()
			})
		})

		it('updates the current frame', async () => {
			await subject({ animationFunctionObjects, layerFunctionObjects })

			expect(updateCurrentFrame.default).toHaveBeenCalledWith(to.Frame(45))
		})

		describe('maybe resolving the animation', () => {
			it('does not if the end frame is zero', async () => {
				appState.controls.endFrame = to.Frame(0)
				appState.controls.currentFrame = to.Frame(3)

				await subject({ animationFunctionObjects, layerFunctionObjects })

				expect(appState.execute.resolveAnimation).not.toHaveBeenCalled()
				expect(clearAnimationIntervalAndRemoveFromState.default).not.toHaveBeenCalled()
			})

			// tslint:disable-next-line:max-line-length
			it('does not if the end frame is greater than zero and greater than or equal to the current frame', async () => {
				appState.controls.endFrame = to.Frame(3)
				appState.controls.currentFrame = to.Frame(3)

				await subject({ animationFunctionObjects, layerFunctionObjects })

				expect(appState.execute.resolveAnimation).not.toHaveBeenCalled()
				expect(clearAnimationIntervalAndRemoveFromState.default).not.toHaveBeenCalled()
			})

			it('does if the end frame is greater than zero but less than the current frame', async () => {
				appState.controls.endFrame = to.Frame(3)
				appState.controls.currentFrame = to.Frame(4)

				await subject({ animationFunctionObjects, layerFunctionObjects })

				expect(appState.execute.resolveAnimation).toHaveBeenCalled()
				expect(clearAnimationIntervalAndRemoveFromState.default).toHaveBeenCalled()
			})
		})
	})
})
