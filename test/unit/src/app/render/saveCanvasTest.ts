import { appState, saveBlobThroughAnchor, saveCanvas, to } from '../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { buildMockContext } from '../../../helpers'

describe('save canvas', () => {
	let subject: () => void
	// tslint:disable-next-line:no-object-literal-type-assertion
	const result: Blob = {} as Blob
	beforeEach(() => {
		subject = saveCanvas.default
		const toBlobSpy: Spy = jasmine.createSpy('toBlob').and.callFake((fn: (result: Blob) => void): void => {
			fn(result)
		})
		appState.render.mixedDownContext = buildMockContext({ toBlobSpy }) as CanvasRenderingContext2D
		spyOn(saveBlobThroughAnchor, 'default')
	})

	describe('when exporting frames', () => {
		beforeEach(() => {
			appState.controls.exportFrames = true

			subject()
		})

		it('saves the frame as a png with the last completed frame number as file name', () => {
			expect(saveBlobThroughAnchor.default).toHaveBeenCalledWith({
				blob: result,
				name: 'houndstooth_animation_frame_0.png',
			})
		})
	})

	describe('when not exporting frames', () => {
		beforeEach(() => {
			appState.controls.exportFrames = false
		})

		describe('when the current frame is greater than 0', () => {
			beforeEach(() => {
				appState.controls.currentFrame = to.Frame(777)

				subject()
			})

			it('saves the frame as a png with the current frame number as file name', () => {
				expect(saveBlobThroughAnchor.default).toHaveBeenCalledWith({
					blob: result,
					name: 'houndstooth_animation_frame_777.png',
				})
			})
		})

		describe('when the current frame is 0', () => {
			beforeEach(() => {
				appState.controls.currentFrame = to.Frame(0)

				subject()
			})

			it('saves the frame as a png with a generic name', () => {
				expect(saveBlobThroughAnchor.default).toHaveBeenCalledWith({
					blob: result,
					name: 'houndstooth_snapshot.png',
				})
			})
		})
	})
})
