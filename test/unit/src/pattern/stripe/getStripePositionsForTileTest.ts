import {
	Address,
	getStripePositionsForTile,
	patternState,
	StripePosition,
	stripePositionSettings,
	to,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

const subject: (_?: { gridAddress?: Address }) => StripePosition[] = getStripePositionsForTile.default

describe('get stripe positions for tile', () => {
	it('defaults to standard stripes', () => {
		expect(subject()).toEqual(to.StripePositions([ 0, 0.5, 1, 1.5 ]))
	})

	it('uses a stripe position function if provided', () => {
		const expectedStripePositions: StripePosition[] = []
		const gridAddress: Address = to.Address([ 3, 5 ])
		const currentSettings: stripePositionSettings.StripePositionSettings = patternState.get('stripePositionSettings')
		const stripePositionsSpy: Spy = spyOn(currentSettings, 'getStripePositions')
		stripePositionsSpy.and.returnValue(expectedStripePositions)

		const actualStripePositions: StripePosition[] = subject({ gridAddress })

		expect(stripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
