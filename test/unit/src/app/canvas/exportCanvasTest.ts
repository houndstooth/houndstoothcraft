import { DataBlob, exportCanvas, saveCanvas, state, to } from '../../../../../src'
import Spy = jasmine.Spy
import { buildMockContext } from '../../../../helpers'

describe('export canvas', () => {
	it('calls toBlob on the mixed down canvas, and saves the result with the current frame number', () => {
		const result: DataBlob = {}
		const toBlobSpy: Spy = jasmine.createSpy('toBlob').and.callFake((fn: (result: DataBlob) => void): void => {
			fn(result)
		})
		state.mixedDownContext = buildMockContext({ toBlobSpy })
		spyOn(saveCanvas, 'default')
		state.currentFrame = to.Frame(987)

		exportCanvas.default()

		expect(saveCanvas.default).toHaveBeenCalledWith({ result, currentFrame: to.Frame(987) })
	})
})