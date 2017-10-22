import { getFromBaseOrDefaultPattern, to } from '../../../../src'
import { getStripePositionsForTile } from '../../../../src/components/getStripePositionsForTile'
import { composeMainHoundstooth } from '../../../../src/execute/composeMainHoundstooth'
import { StripePositionSettings } from '../../../../src/store/types/settings/stripe/StripePositionSettings'

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
		const stripePositionSettings: StripePositionSettings = getFromBaseOrDefaultPattern('stripePosition')
		stripePositionSettings.getStripePositions = stripePositionsSpy

		const actualStripePositions = getStripePositionsForTile({ gridAddress })

		expect(stripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
