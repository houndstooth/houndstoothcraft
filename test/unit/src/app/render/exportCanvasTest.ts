import { appState, DataBlob, exportCanvas, NullarySideEffector, saveCanvas, to } from '../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { buildMockContext } from '../../../helpers'


describe('export canvas', () => {
	it('calls toBlob on the mixed down canvas, and saves the result with the current frame number', () => {
		const subject: NullarySideEffector = exportCanvas.default
		const result: DataBlob = {}
		const toBlobSpy: Spy = jasmine.createSpy('toBlob').and.callFake((fn: (result: DataBlob) => void): void => {
			fn(result)
		})
		appState.render.mixedDownContext = buildMockContext({ toBlobSpy }) as CanvasRenderingContext2D
		spyOn(saveCanvas, 'default')
		appState.controls.currentFrame = to.Frame(987)

		subject()

		expect(saveCanvas.default).toHaveBeenCalledWith({ result, currentFrame: to.Frame(987) })
	})
})