import { DataBlob, saveBlob, saveCanvas, state, to } from '../../../../../src'

describe('save canvas', () => {
	const result: DataBlob = {}
	beforeEach(() => {
		spyOn(saveBlob, 'default')
	})

	describe('animating', () => {
		describe('when exporting frames (and animating)', () => {
			beforeEach(() => {
				state.exportFrames = true
				state.animating = true
				state.lastSavedFrame = to.Frame(666)

				saveCanvas.default(result)
			})

			it('saves the frame as a png with the last saved frame number as file name', () => {
				expect(saveBlob.default).toHaveBeenCalledWith({ blob: result, name: 'houndstooth_animation_frame_666.png' })
			})
		})

		describe('when not exporting frames', () => {
			beforeEach(() => {
				state.exportFrames = false
			})

			describe('when the current frame is greater than 0', () => {
				beforeEach(() => {
					state.currentFrame = to.Frame(777)

					saveCanvas.default(result)
				})

				it('saves the frame as a png with the current frame number as file name', () => {
					expect(saveBlob.default).toHaveBeenCalledWith({ blob: result, name: 'houndstooth_animation_frame_777.png' })
				})
			})

			describe('when the current frame is 0', () => {
				beforeEach(() => {
					state.currentFrame = to.Frame(0)

					saveCanvas.default(result)
				})

				it('saves the frame as a png with a generic name', () => {
					expect(saveBlob.default).toHaveBeenCalledWith({ blob: result, name: 'houndstooth_snapshot.png' })
				})
			})
		})
	})

	it('increments the last saved frame', () => {
		state.lastSavedFrame = to.Frame(100)

		saveCanvas.default(result)

		expect(state.lastSavedFrame).toBe(to.Frame(101))
	})
})
