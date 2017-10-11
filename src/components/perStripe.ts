import state from '../state'
import { PERIMETER_SCALAR } from '../constants'
import { iterator } from '../utilities/codeUtilities'

type GetStripePosition = { ({}: { stripeIndex: number, stripeCount: number }): number }

type PerStripe = { ({}: { getStripePosition: GetStripePosition }): number[] }

const perStripe: PerStripe = ({ getStripePosition }) => {
	const stripeCount = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountSetting
	return iterator(stripeCount).map(stripeIndex => {
		return getStripePosition({ stripeIndex, stripeCount }) * PERIMETER_SCALAR
	})
}

export default perStripe
