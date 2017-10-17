import getStripePositionsForTile from '../../../../src/components/getStripePositionsForTile'
import Address from '../../../../src/components/types/Address'
import composeMainHoundstooth from '../../../../src/execute/composeMainHoundstooth'
import state from '../../../../src/state'

describe('get stripe positions for tile', () => {
	beforeEach(() => composeMainHoundstooth)

	it('defaults to standard stripes', () => {
		expect(getStripePositionsForTile()).toEqual([ 0, 0.5, 1, 1.5 ] as any)
	})

	it('uses a stripe position function if provided', () => {
		const expectedStripePositions = []
		const gridAddress = [ 3, 5 ] as Address
		const getStripePositionsSpy = jasmine.createSpy('getStripePositions')
		getStripePositionsSpy.and.returnValue(expectedStripePositions)
		const basePattern = state.mainHoundstooth.basePattern || {}
		const stripeSettings = basePattern.stripeSettings || {}
		const stripePositionSettings = stripeSettings.stripePositionSettings || {}
		stripePositionSettings.getStripePositions = getStripePositionsSpy

		const actualStripePositions = getStripePositionsForTile({ gridAddress })

		expect(getStripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
