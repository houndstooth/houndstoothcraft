import {
	Address,
	composeMainHoundstooth,
	getFromBaseOrDefaultPattern,
	getStripePositionsForTile,
	StripePosition,
	stripePositionSettings,
	to,
} from '../../../../../src'
import Spy = jasmine.Spy

describe('get stripe positions for tile', () => {
	beforeEach(() => {
		composeMainHoundstooth.main()
	})

	it('defaults to standard stripes', () => {
		expect(getStripePositionsForTile.main()).toEqual(to.StripePositions([ 0, 0.5, 1, 1.5 ]))
	})

	it('uses a stripe position function if provided', () => {
		const expectedStripePositions: StripePosition[] = []
		const gridAddress: Address = to.Address([ 3, 5 ])
		// tslint:disable-next-line:max-line-length
		const currentStripePositionSettings: stripePositionSettings.StripePositionSettings = getFromBaseOrDefaultPattern.main('stripePositionSettings')
		const stripePositionsSpy: Spy = spyOn(currentStripePositionSettings, 'getStripePositions')
		stripePositionsSpy.and.returnValue(expectedStripePositions)

		const actualStripePositions: StripePosition[] = getStripePositionsForTile.main({ gridAddress })

		expect(stripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
