import * as to from '../utilities/to'
import { perStripe } from './perStripe'
import { GetStripePosition, GetStripePositions } from './types'

const standardStripePositions: GetStripePositions = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition: GetStripePosition = ({ stripeCount, stripeIndex }) =>
	to.StripePosition(stripeIndex / stripeCount)

export { standardStripePositions }
