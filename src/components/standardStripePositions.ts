import * as to from '../utilities/to'
import { perStripe } from './perStripe'
import { StripePosition } from './types'

const standardStripePositions: () => StripePosition[] = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition: (_: { stripeCount, stripeIndex }) => StripePosition = ({ stripeCount, stripeIndex }) =>
	to.StripePosition(stripeIndex / stripeCount)

export { standardStripePositions }
