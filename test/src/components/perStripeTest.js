import perStripe from '../../../src/components/perStripe'
import composeMainHoundstooth from '../../../src/execute/composeMainHoundstooth'
import state from '../../../state'
import resetState from '../../../src/store/resetState'
import noop from '../helpers/noop'

describe('per stripe', () => {
	beforeEach(() => {
		resetState(state)
		composeMainHoundstooth()
	})

	it('uses a stripe count if provided', () => {
		state.mainHoundstooth.basePattern.stripeSettings = {
			stripePositionSettings: {
				stripeCountSetting: 3,
			},
		}
		const stripePositions = perStripe({
			getStripePosition: noop,
		})

		expect(stripePositions.length).toBe(3)
	})

	it('calls the stripe position function once for each stripe', () => {
		const getStripePositionSpy = jasmine.createSpy()

		perStripe({ getStripePosition: getStripePositionSpy })

		const spyCalls = getStripePositionSpy.calls.all()
		expect(spyCalls.length).toBe(4)
		expect(spyCalls[ 0 ].args[ 0 ]).toEqual({ stripeIndex: 0, stripeCount: 4 })
		expect(spyCalls[ 1 ].args[ 0 ]).toEqual({ stripeIndex: 1, stripeCount: 4 })
		expect(spyCalls[ 2 ].args[ 0 ]).toEqual({ stripeIndex: 2, stripeCount: 4 })
		expect(spyCalls[ 3 ].args[ 0 ]).toEqual({ stripeIndex: 3, stripeCount: 4 })
	})

	it('multiplies the result of each stripe position by the perimeter scalar', () => {
		const standardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount
		const stripePositions = perStripe({ getStripePosition: standardStripePosition })

		const expectedStripePositions = [ 0, 0.5, 1, 1.5 ]
		expect(stripePositions).toEqual(expectedStripePositions)
	})
})
