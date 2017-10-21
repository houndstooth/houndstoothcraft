import { PERIMETER_SCALAR } from '../constants'
import * as from from '../from'
import { getSetting } from '../store'
import * as to from '../to'
import { iterator } from '../utilities/codeUtilities'
import { GetStripePosition, StripePosition } from './types'

const perStripe: (_: { getStripePosition: GetStripePosition }) => StripePosition[] = ({ getStripePosition }) => {
	const stripeCount: number = getSetting('stripeCount')

	return to.StripePositions(iterator(stripeCount).map(stripeIndex =>
		from.StripePosition(getStripePosition({ stripeIndex, stripeCount })) * PERIMETER_SCALAR))
}

export { perStripe }
