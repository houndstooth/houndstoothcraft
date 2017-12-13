import {
	Address,
	getStripePositionsForTile,
	patternState,
	StripePosition,
	to,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { StripePositionSettings } from '../../../../../src/pattern/stripe/stripePositionSettings'

describe('get stripe positions for tile', () => {
	let subject: (_?: { address?: Address }) => StripePosition[]
	beforeEach(() => {
		subject = getStripePositionsForTile.default
	})

	it('defaults to standard stripes', () => {
		expect(subject()).toEqual(to.StripePositions([ 0, 0.5, 1, 1.5 ]))
	})

	it('uses a stripe position function if provided', () => {
		const expectedStripePositions: StripePosition[] = []
		const address: Address = to.Address([ 3, 5 ])
		const currentSettings: StripePositionSettings = patternState.stripeSettings.stripePositionSettings
		const stripePositionsSpy: Spy = spyOn(currentSettings, 'getStripePositions')
		stripePositionsSpy.and.returnValue(expectedStripePositions)

		const actualStripePositions: StripePosition[] = subject({ address })

		expect(stripePositionsSpy).toHaveBeenCalledWith({ address })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
