import { state, to } from '../../../../src'
import { perStripe } from '../../../../src/components/perStripe'
import { composeMainHoundstooth } from '../../../../src/execute/composeMainHoundstooth'

describe('per stripe', () => {
	beforeEach(() => composeMainHoundstooth)

	it('uses a stripe count if provided', () => {
		state.mainHoundstooth.basePattern.stripeSettings = {
			stripePositionSettings: {
				stripeCount: 3,
			},
		}
		const stripePositions = perStripe({ getStripePosition: () => to.StripePosition(5) })

		expect(stripePositions.length).toBe(3)
	})

	it('calls the stripe position function once for each stripe', () => {
		const getStripePositionSpy = jasmine.createSpy('getStripePosition')

		perStripe({ getStripePosition: getStripePositionSpy })

		const spyCalls = getStripePositionSpy.calls.all()
		expect(spyCalls.length).toBe(4)
		expect(spyCalls[ 0 ].args[ 0 ]).toEqual({ stripeIndex: 0, stripeCount: 4 })
		expect(spyCalls[ 1 ].args[ 0 ]).toEqual({ stripeIndex: 1, stripeCount: 4 })
		expect(spyCalls[ 2 ].args[ 0 ]).toEqual({ stripeIndex: 2, stripeCount: 4 })
		expect(spyCalls[ 3 ].args[ 0 ]).toEqual({ stripeIndex: 3, stripeCount: 4 })
	})

	it('multiplies the result of each stripe position by the perimeter scalar', () => {
		const standardStripePosition = ({ stripeIndex, stripeCount }) => to.StripePosition(stripeIndex / stripeCount)
		const stripePositions = perStripe({ getStripePosition: standardStripePosition })

		const expectedStripePositions = to.StripePositions([ 0, 0.5, 1, 1.5 ])
		expect(stripePositions).toEqual(expectedStripePositions)
	})
})
