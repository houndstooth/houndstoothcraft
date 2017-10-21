import { PERIMETER_SCALAR } from '../constants'
import * as from from '../from'
import { state } from '../state'
import * as to from '../to'
import { iterator } from '../utilities/codeUtilities'
import { GetStripePosition, StripePosition } from './types'

const perStripe: (_: { getStripePosition: GetStripePosition }) => StripePosition[] = ({ getStripePosition }) => {
	const stripeCount = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountSetting || 0

	return to.StripePositions(iterator(stripeCount).map(stripeIndex =>
		from.StripePosition(getStripePosition({ stripeIndex, stripeCount })) * PERIMETER_SCALAR))
}

export { perStripe }
