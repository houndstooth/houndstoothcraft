import { GetStripePosition, patternState, perStripe, StripePosition, to } from '../../../../../src/indexForTest'
import CallInfo = jasmine.CallInfo

describe('per stripe', () => {
	let subject: (_: { getStripePosition: GetStripePosition }) => StripePosition[]
	beforeEach(() => {
		subject = perStripe.default
	})

	it('uses a stripe count if provided', () => {
		patternState.stripeSettings.stripePositionSettings.stripeCount =  3

		const stripePositions: StripePosition[] = subject({
			getStripePosition: (): StripePosition => to.StripePosition(5),
		})

		expect(stripePositions.length).toBe(3)
	})

	it('calls the stripe position function once for each stripe', () => {
		// tslint:disable-next-line:no-any
		const getStripePositionSpy: any = jasmine.createSpy('getStripePosition')
		// tslint:disable-next-line:no-unsafe-any
		subject({ getStripePosition: getStripePositionSpy })
		// tslint:disable-next-line:no-unsafe-any
		// @ts-ignore
		const spyCalls: CallInfo[] = getStripePositionSpy.calls.all()
		expect(spyCalls.length).toBe(4)
		expect(spyCalls[ 0 ].args[ 0 ]).toEqual({ stripeIndex: 0, stripeCount: 4 })
		expect(spyCalls[ 1 ].args[ 0 ]).toEqual({ stripeIndex: 1, stripeCount: 4 })
		expect(spyCalls[ 2 ].args[ 0 ]).toEqual({ stripeIndex: 2, stripeCount: 4 })
		expect(spyCalls[ 3 ].args[ 0 ]).toEqual({ stripeIndex: 3, stripeCount: 4 })
	})

	it('multiplies the result of each stripe position by the perimeter scalar', () => {
		const standardStripePosition: GetStripePosition = ({ stripeIndex, stripeCount }: {
			stripeCount: number, stripeIndex: number,
		}): StripePosition => to.StripePosition(stripeIndex / stripeCount)
		const stripePositions: StripePosition[] = subject({ getStripePosition: standardStripePosition })

		const expectedStripePositions: StripePosition[] = to.StripePositions([ 0, 0.5, 1, 1.5 ])
		expect(stripePositions).toEqual(expectedStripePositions)
	})
})
