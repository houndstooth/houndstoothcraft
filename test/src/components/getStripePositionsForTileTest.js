import getStripePositionsForTile from '../../../src/components/getStripePositionsForTile'
import composeMainHoundstooth from '../../../src/execute/composeMainHoundstooth'
import state from '../../../src/state'
import resetState from '../../../src/store/resetState'

describe('get stripe positions for tile', () => {
	beforeEach(() => {
		resetState(state)
		composeMainHoundstooth()
	})

	it('defaults to standard stripes', () => {
		expect(getStripePositionsForTile()).toEqual([ 0, 0.5, 1, 1.5 ])
	})

	it('uses a stripe position function if provided', () => {
		const expectedStripePositions = []
		const gridAddress = [ 3, 5 ]
		let getStripePositionsSpy = jasmine.createSpy().and.returnValue(expectedStripePositions)
		state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.getStripePositions = getStripePositionsSpy

		const actualStripePositions = getStripePositionsForTile({ gridAddress })

		expect(getStripePositionsSpy).toHaveBeenCalledWith({ gridAddress })
		expect(actualStripePositions).toBe(expectedStripePositions)
	})
})
