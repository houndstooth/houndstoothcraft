import {
	buildAnimationFunction,
	callFunctionsPerSetting,
	clear,
	executePattern,
	exportCanvas,
	Frame,
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

	const layerFunctionObjects: SettingsFunctionObject[] = []
	const animationFunctionObjects: SettingsFunctionObject[] = []

	beforeEach(() => {
		executePatternSpy = spyOn(executePattern, 'default')
		spyOn(callFunctionsPerSetting, 'default')
		spyOn(clear, 'default')
		spyOn(exportCanvas, 'default')

		animationFunction = buildAnimationFunction.default({
			animationFunctionObjects,
			layerFunctionObjects,
		})
	})

	it('executes a grid with the layer functions', async (done: DoneFn) => {
		await animationFunction()

		expect(executePatternSpy).toHaveBeenCalledWith({ layerFunctionObjects })

		done()
	})

	it('updates settings for the next frame', async (done: DoneFn) => {
		await animationFunction()

		expect(callFunctionsPerSetting.default).toHaveBeenCalledWith({
			settingsFunctionObjects: animationFunctionObjects,
		})

		done()
	})

	describe('canvas clearing', () => {
		it('clears the canvas by default', async (done: DoneFn) => {
			await animationFunction()

			expect(clear.default).toHaveBeenCalled()

			done()
		})

		it('does not clear the canvas if refreshing the canvas is off', async (done: DoneFn) => {
			setSetting.default('refreshCanvas', false)
			setSetting.default('startFrame', to.Frame(0))

			await animationFunction()

			expect(clear.default).not.toHaveBeenCalled()

			done()
		})
	})

	describe('frame exporting', () => {
		const currentFrame: Frame = to.Frame(5)
		beforeEach(() => {
			state.exportFrames = true
			state.currentFrame = currentFrame
		})

		describe('when the current frame has not yet completed exporting', () => {
			beforeEach(async (done: DoneFn) => {
				state.lastSavedFrame = to.Frame(4)

				await animationFunction()

				done()
			})

			it('does not execute the grid', () => {
				expect(executePatternSpy).not.toHaveBeenCalled()
			})

			it('does not increment the current frame', () => {
				expect(state.currentFrame).toBe(currentFrame)
			})

			it('does not update the settings for the next frame', () => {
				expect(callFunctionsPerSetting.default).not.toHaveBeenCalled()
			})

			it('does not export again', () => {
				expect(exportCanvas.default).not.toHaveBeenCalled()
			})
		})

		describe('when the current frame has has already been exported', () => {
			beforeEach(async (done: DoneFn) => {
				state.lastSavedFrame = currentFrame

				await animationFunction()

				done()
			})

			it('still executes the grid', () => {
				expect(executePatternSpy).toHaveBeenCalled()
			})

			it('increments the current frame', () => {
				expect(state.currentFrame).toBe(to.Frame(6))
			})

			it('still updates the settings for the next frame', () => {
				expect(callFunctionsPerSetting.default).toHaveBeenCalled()
			})

			it('exports again', () => {
				expect(exportCanvas.default).toHaveBeenCalled()
			})
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
