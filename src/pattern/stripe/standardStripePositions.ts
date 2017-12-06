import { to } from '../../utilities'
import perStripe from './perStripe'
import { GetStripePosition, GetStripePositionParams, GetStripePositions, StripePosition } from './types'

const standardStripePositions: GetStripePositions =
	(): StripePosition[] => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition: GetStripePosition =
	({ stripeCount, stripeIndex }: GetStripePositionParams): StripePosition =>
		to.StripePosition(stripeIndex / stripeCount)

export default standardStripePositions
