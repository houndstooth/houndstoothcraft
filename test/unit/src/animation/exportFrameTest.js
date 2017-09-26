import exportFrame from '../../../../src/animation/exportFrame'
import state from '../../../../src/state'
import * as saveFrame from '../../../../src/animation/saveFrame'
import buildMockContext from '../../helpers/buildMockContext'

describe('export frame', () => {
	it('calls toBlob on the mixed down canvas', () => {
		const toBlobSpy = jasmine.createSpy()
		state.mixedDownContext = buildMockContext({ toBlobSpy })

		exportFrame()

		expect(toBlobSpy).toHaveBeenCalledWith(saveFrame.default)
	})
})
