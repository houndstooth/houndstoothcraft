import { exportCanvas, saveCanvas, state } from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import Spy = jasmine.Spy

describe('export canvas', () => {
	it('calls toBlob on the mixed down canvas', () => {
		const toBlobSpy: Spy = jasmine.createSpy('toBlob')
		state.mixedDownContext = buildMockContext({ toBlobSpy })

		exportCanvas.main()

		expect(toBlobSpy).toHaveBeenCalledWith(saveCanvas.main)
	})
})
