import { PERIMETER_SCALAR } from '../constants'
import { getSetting } from '../store'
import { iterator } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { GetStripePosition, StripePosition } from './types'

const perStripe: (_: { getStripePosition: GetStripePosition }) => StripePosition[] = ({ getStripePosition }) => {
	const stripeCount: number = getSetting('stripeCount')

	return to.StripePositions(iterator(stripeCount).map(stripeIndex =>
		from.StripePosition(getStripePosition({ stripeIndex, stripeCount })) * PERIMETER_SCALAR))
}

export { perStripe }
