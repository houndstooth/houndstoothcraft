import state from '../../state'
import { PERIMETER_SCALAR } from '../constants'
import { iterator } from '../utilities/codeUtilities'

const perStripe = ({ getStripePosition }) => {
	const stripeCount = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountSetting
	return iterator(stripeCount).map(stripeIndex => {
		return getStripePosition({ stripeIndex, stripeCount }) * PERIMETER_SCALAR
	})
}

export default perStripe
