import state from '../state'
import { PERIMETER_SCALAR } from '../constants'
import { iterator } from '../utilities/codeUtilities'
import { StripePosition } from './types'

type GetStripePosition = { ({}: { stripeIndex: number, stripeCount: number }): StripePosition }

type PerStripe = { ({}: { getStripePosition: GetStripePosition }): StripePosition[] }

const perStripe: PerStripe = ({ getStripePosition }) => {
	const stripeCount = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountSetting
	return iterator(stripeCount).map(stripeIndex => {
		return getStripePosition({ stripeIndex, stripeCount }) as any * PERIMETER_SCALAR
	}) as any
}

export default perStripe
