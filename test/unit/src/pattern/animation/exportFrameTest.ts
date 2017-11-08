import { exportFrame } from '../../../../../src/pattern/animation/exportFrame'
import * as saveFrame from '../../../../../src/pattern/animation/saveFrame'
import { state } from '../../../../../src/state'
import { buildMockContext } from '../../../../helpers/buildMockContext'
import Spy = jasmine.Spy

describe('export frame', () => {
	it('calls toBlob on the mixed down canvas', () => {
		const toBlobSpy: Spy = jasmine.createSpy('toBlob')
		state.mixedDownContext = buildMockContext({ toBlobSpy })

		exportFrame()

		expect(toBlobSpy).toHaveBeenCalledWith(saveFrame.saveFrame)
	})
})
