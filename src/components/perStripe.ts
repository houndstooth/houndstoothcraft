import state from '../state'
import { PERIMETER_SCALAR } from '../constants'
import { iterator } from '../utilities/codeUtilities'
import { StripePosition, GetStripePosition } from './types'

const perStripe: { ({}: { getStripePosition: GetStripePosition }): StripePosition[] } = ({ getStripePosition }) => {
	const stripeCount = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountSetting

	return iterator(stripeCount).map(stripeIndex =>
		getStripePosition({ stripeIndex, stripeCount }) as any * PERIMETER_SCALAR) as any
}

export default perStripe
