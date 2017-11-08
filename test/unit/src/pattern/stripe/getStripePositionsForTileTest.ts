import { composeMainHoundstooth } from '../../../../../src/app/execute/composeMainHoundstooth'
import { getFromBaseOrDefaultPattern } from '../../../../../src/app/store/getFromBaseOrDefaultPattern'
import { Address } from '../../../../../src/pattern/grid/types'
import { getStripePositionsForTile } from '../../../../../src/pattern/stripe/getStripePositionsForTile'
import { StripePositionSettings } from '../../../../../src/pattern/stripe/stripePositionSettings'
import Spy = jasmine.Spy
import { StripePosition } from '../../../../../src/pattern/stripe/types'
import * as to from '../../../../../src/to'

describe('get stripe positions for tile', () => {
	beforeEach(() => composeMainHoundstooth)

	it('defaults to standard stripes', () => {
		expect(getStripePositionsForTile()).toEqual(to.StripePositions([ 0, 0.5, 1, 1.5 ]))
	})

	it('uses a stripe position function if provided', () => {
		const expectedStripePositions: StripePosition[] = []
		const gridAddress: Address = to.Address([ 3, 5 ])
		const stripePositionSettings: StripePositionSettings = getFromBaseOrDefaultPattern('stripePositionSettings')
		const stripePositionsSpy: Spy = spyOn(stripePositionSettings, 'getStripePositions')
		stripePositionsSpy.and.returnValue(expectedStripePositions)

		const actualStripePositions: StripePosition[] = getStripePositionsForTile({ gridAddress })

		expect(stripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
