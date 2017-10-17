import { PERIMETER_SCALAR } from '../constants'
import state from '../state'
import { iterator } from '../utilities/codeUtilities'
import { GetStripePosition, StripePosition } from './types'

const perStripe: { ({}: { getStripePosition: GetStripePosition }): StripePosition[] } = ({ getStripePosition }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const stripeSettings = basePattern.stripeSettings || {}
	const stripePositionSettings = stripeSettings.stripePositionSettings || {}
	const stripeCount = stripePositionSettings.stripeCountSetting || 0

	return iterator(stripeCount).map(stripeIndex =>
		getStripePosition({ stripeIndex, stripeCount }) as any * PERIMETER_SCALAR) as any
}

export default perStripe
