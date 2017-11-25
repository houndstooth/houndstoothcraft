import { exportFrame, saveFrame, state } from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import Spy = jasmine.Spy

describe('export frame', () => {
	it('calls toBlob on the mixed down canvas', () => {
		const toBlobSpy: Spy = jasmine.createSpy('toBlob')
		state.mixedDownContext = buildMockContext({ toBlobSpy })

		exportFrame.main()

		expect(toBlobSpy).toHaveBeenCalledWith(saveFrame.main)
	})
})
