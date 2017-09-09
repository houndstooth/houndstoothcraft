import store from '../../store'
import { PERIMETER_SCALAR } from '../constants'
import codeUtilities from '../utilities/codeUtilities'

export default ({ getStripePosition }) => {
	const stripeCount = store.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountSetting
	return codeUtilities.iterator(stripeCount).map(stripeIndex => {
		return getStripePosition({ stripeIndex, stripeCount }) * PERIMETER_SCALAR
	})
}
