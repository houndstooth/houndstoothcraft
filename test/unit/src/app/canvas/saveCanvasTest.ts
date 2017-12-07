import { appState, DataBlob, saveBlob, saveCanvas, to } from '../../../../../src'

describe('save canvas', () => {
	const result: DataBlob = {}
	beforeEach(() => {
		spyOn(saveBlob, 'default')
	})

	describe('animating', () => {
		describe('when exporting frames', () => {
			beforeEach(() => {
				appState.controls.exportFrames = true

				saveCanvas.default({ currentFrame: to.Frame(0), result })
			})

			it('saves the frame as a png with the last completed frame number as file name', () => {
				expect(saveBlob.default).toHaveBeenCalledWith({ blob: result, name: 'houndstooth_animation_frame_0.png' })
			})
		})

		describe('when not exporting frames', () => {
			beforeEach(() => {
				appState.controls.exportFrames = false
			})

			describe('when the current frame is greater than 0', () => {
				beforeEach(() => {
					saveCanvas.default({ currentFrame: to.Frame(777), result })
				})

				it('saves the frame as a png with the current frame number as file name', () => {
					expect(saveBlob.default).toHaveBeenCalledWith({ blob: result, name: 'houndstooth_animation_frame_777.png' })
				})
			})

			describe('when the current frame is 0', () => {
				beforeEach(() => {
					saveCanvas.default({ currentFrame: to.Frame(0), result })
				})

				it('saves the frame as a png with a generic name', () => {
					expect(saveBlob.default).toHaveBeenCalledWith({ blob: result, name: 'houndstooth_snapshot.png' })
				})
			})
		})
	})
})
