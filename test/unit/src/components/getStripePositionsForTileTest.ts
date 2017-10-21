import { state, to } from '../../../../src'
import { getStripePositionsForTile } from '../../../../src/components/getStripePositionsForTile'
import { composeMainHoundstooth } from '../../../../src/execute/composeMainHoundstooth'

describe('get stripe positions for tile', () => {
	beforeEach(() => composeMainHoundstooth)

	it('defaults to standard stripes', () => {
		expect(getStripePositionsForTile()).toEqual(to.StripePositions([ 0, 0.5, 1, 1.5 ]))
	})

	it('uses a stripe position function if provided', () => {
		const expectedStripePositions = []
		const gridAddress = to.Address([ 3, 5 ])
		const stripePositionsSpy = jasmine.createSpy('getStripePositions')
		stripePositionsSpy.and.returnValue(expectedStripePositions)
		state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.getStripePositions = stripePositionsSpy

		const actualStripePositions = getStripePositionsForTile({ gridAddress })

		expect(stripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
