import {
	Address,
	getStripePositionsForTile,
	patternState,
	StripePosition,
	stripePositionSettings,
	to,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('get stripe positions for tile', () => {
	let subject: (_?: { gridAddress?: Address }) => StripePosition[]
	beforeEach(() => {
		subject = getStripePositionsForTile.default
	})

	it('defaults to standard stripes', () => {
		expect(subject()).toEqual(to.StripePositions([ 0, 0.5, 1, 1.5 ]))
	})

	it('uses a stripe position function if provided', () => {
		const expectedStripePositions: StripePosition[] = []
		const gridAddress: Address = to.Address([ 3, 5 ])
		const currentSettings: stripePositionSettings.StripePositionSettings = getFromPattern(patternState, 'stripePositionSettings')
		const stripePositionsSpy: Spy = spyOn(currentSettings, 'getStripePositions')
		stripePositionsSpy.and.returnValue(expectedStripePositions)

		const actualStripePositions: StripePosition[] = subject({ gridAddress })

		expect(stripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
