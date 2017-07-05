import stripeUtilities from '../../../src/utilities/stripeUtilities'
import { STRIPE_COUNT } from '../../../src/defaults'

describe('stripe utilities', () => {
	describe('#getStripePositionsForTile', () => {
		let getStripePositionsForTile
		beforeEach(() => getStripePositionsForTile = stripeUtilities.getStripePositionsForTile)

		it('defaults to standard stripes', () => {
			expect(getStripePositionsForTile()).toEqual([ 0, 0.5, 1, 1.5 ])
		})

		it('uses a stripe position function if provided', () => {
			const expectedStripePositions = []
			const address = [ 3, 5 ]
			let getStripePositionsSpy = jasmine.createSpy().and.returnValue(expectedStripePositions)
			settings.initial.getStripePositions = getStripePositionsSpy

			const actualStripePositions = getStripePositionsForTile({ address })

			expect(getStripePositionsSpy).toHaveBeenCalledWith({ address })
			expect(actualStripePositions).toBe(expectedStripePositions)
		})
	})

	describe('#perStripe', () => {
		let perStripe
		beforeEach(() => perStripe = stripeUtilities.perStripe)

		it('defaults the stripe count', () => {
			const stripePositions = perStripe({ getStripePosition: () => {} })

			expect(stripePositions.length).toBe(STRIPE_COUNT)
		})

		it('uses a stripe count if provided', () => {
			settings.initial.stripeCountSettings = { stripeCount: 3 }
			const stripePositions = perStripe({ getStripePosition: () => {} })

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
})