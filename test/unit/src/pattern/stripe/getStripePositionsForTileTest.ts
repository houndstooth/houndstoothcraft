import {
	Address,
	composeMainHoundstooth,
	getStripePositionsForTile,
	StripePosition,
	stripePositionSettings,
	to,
} from '../../../../../src'
// tslint:disable-next-line:no-reaching-imports
import { main as getFromBaseOrDefaultPattern } from '../../../../../src/app/store/getFromBaseOrDefaultPattern'
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
		const currentStripePositionSettings: stripePositionSettings.StripePositionSettings = getFromBaseOrDefaultPattern('stripePositionSettings')
		const stripePositionsSpy: Spy = spyOn(currentStripePositionSettings, 'getStripePositions')
		stripePositionsSpy.and.returnValue(expectedStripePositions)

		const actualStripePositions: StripePosition[] = getStripePositionsForTile.main({ gridAddress })

		expect(stripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
